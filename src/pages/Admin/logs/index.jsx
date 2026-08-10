import React from "react";

import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";

import { getLogs } from "../../../helpers/api/logs";
import { getResourceCollection } from "../../../helpers/api/response";
import { formatDate } from "../../../helpers/formatters";
import Loader from "../../../components/Loader";

function createData({ id, name, action, created_at }) {
  return {
    id,
    name,
    action,
    created_at,
  };
}

const columns = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "name",
    name: "User",
  },
  {
    key: "action",
    name: "Action",
  },
  {
    key: "created_at",
    name: "Created at",
  },
];

const Logs = () => {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const logs = async () => {
    try {
      const response = await getLogs();
      const data = getResourceCollection(response);

      if (data.length > 0) {
        setRows(
          data.map((log) =>
            createData({
              ...log,
              name: `${log.user?.first_name || ""} ${log.user?.last_name || ""}`,
              created_at: formatDate(log.created_at),
            })
          )
        );
      }
    } catch (error) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    logs();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h1>Logs</h1>
      </div>
      {loading ? (
        <Loader tone="admin" label="Loading logs…" minHeight={260} />
      ) : (
        <Table rows={rows} columns={columns} />
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    margin: "0 auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    marginLeft: "20px !important",
  },
}));

export default Logs;
