import React from "react";

import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";

import { getLogs } from "../../../helpers/api/logs";

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

  const logs = async () => {
    try {
      const { data } = await getLogs();

      if (data.length > 0) {
        setRows(
          data.map((log) =>
            createData({
              ...log,
              name: `${log.user.first_name} ${log.user.last_name}`,
              created_at: new Date(log.created_at).toLocaleDateString(),
            })
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    logs();
  }, []);

  console.log(rows);

  return (
    <div className={classes.container}>
      <Table rows={rows} columns={columns} />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1068px",
    margin: "120px auto 630px auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 56,

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
