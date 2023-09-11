import contextPath from "./contextPath";

export const getBaseUrl = () => {
    if (envType === "development") {
        return "https://103.94.159.144:8083/hrms/api/";
    } else if (envType === "production") {
        return path || contextPath() + "/api";
    }
};