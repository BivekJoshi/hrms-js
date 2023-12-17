import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeModeContext from "../theme/ThemeModeContext";
import { routes } from "../routes/routes";
import useAuth from "../auth/hooks/component/login/useAuth";
import { Breadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function BreadCrumb() {
  const { mode } = useContext(ThemeModeContext);
  const location = useLocation();
  let currentPath = location.pathname;
  const findRoute = (path) => routes.find((route) => route.path === path);
  const { isEmployee } = useAuth();

  const pathBreadCrump = () => {
    return currentPath.slice(7);
  };
  const pathSegments = pathBreadCrump().split("/").filter(Boolean);

  return (
    <>
       {pathSegments.length > 0 && (
        <Breadcrumbs>
          <Link
            underline="hover"
            style={{ color: mode === "light" ? "inherit" : "white" }}
            to={'/admin/dashboard'}
          >
            <HomeIcon
              sx={{
                width: "2rem",
                "&:hover": {
                  color: "#6dab23",
                },
              }}
            />
          </Link>
          {pathSegments.map((segment, index) => {
            const partialPath = `/${pathSegments
              .slice(0, index + 1)
              .join("/")}`;

            const route = findRoute(partialPath);

            return (
              <Link
                key={index}
                underline="hover"
                style={{
                  color: mode === "light" ? "inherit" : "white",
                  textDecoration: "none",
                }}
                to={partialPath} // Add this line to set the correct path
              >
                <Typography
                  key={index}
                  color="text.primary"
                  textTransform="capitalize"
                  padding="5px"
                  textDecoration="none"
                  sx={{
                    "&:hover": {
                      bgcolor: "#6DAB2345",
                      padding: "5px",
                      textDecoration: "underline",
                      borderRadius: "5px",
                      color: "#6dab23",
                    },
                  }}
                >
                  {route ? route.name : segment}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </>
  );
}
