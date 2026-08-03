import React from "react";
import { useDispatch, useStore } from "react-redux";
import {
  getStoredAuthToken,
  setUnauthorizedHandler,
  storeAuthToken,
} from "../../config/axios";
import {
  getAuthenticatedUser,
  getUserFromAuthResponse,
} from "../../helpers/api/auth";
import {
  sessionAnonymous,
  sessionAuthenticated,
  sessionLoading,
} from "./AuthSlice";

let sessionRequest = null;

const requestCurrentUser = () => {
  if (!sessionRequest) {
    sessionRequest = getAuthenticatedUser({
      skipAuthFailureHandler: true,
    });
  }

  return sessionRequest;
};

const SessionInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const store = useStore();

  React.useEffect(() => {
    setUnauthorizedHandler(() => {
      storeAuthToken(null);
      dispatch(sessionAnonymous());
    });

    return () => setUnauthorizedHandler(null);
  }, [dispatch]);

  React.useEffect(() => {
    let isActive = true;
    const token = getStoredAuthToken();
    const currentAuth = store.getState().auth;

    if (!token) {
      dispatch(sessionAnonymous());
      return () => {
        isActive = false;
      };
    }

    if (currentAuth?.user) {
      dispatch(sessionAuthenticated({ user: currentAuth.user, token }));

      return () => {
        isActive = false;
      };
    }

    dispatch(sessionLoading());

    requestCurrentUser()
      .then((response) => {
        const user = getUserFromAuthResponse(response);

        if (isActive && store.getState().auth.status === "loading") {
          dispatch(user ? sessionAuthenticated({ user, token }) : sessionAnonymous());
        }
      })
      .catch(() => {
        if (isActive && store.getState().auth.status === "loading") {
          storeAuthToken(null);
          dispatch(sessionAnonymous());
        }
      });

    return () => {
      isActive = false;
    };
  }, [dispatch, store]);

  return children;
};

export default SessionInitializer;
