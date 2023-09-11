import contextPath from "./contextPath";

const path = "https://103.94.159.144:8083/hrms/api/";

export const getBaseUrl = () => {
    const envType = import.meta.env.NODE_ENV
    if (envType === "development") {
        return path;
    } else if (envType === "production") {
        return path || contextPath() + "/api";
    }
};