export const isAdmin = () => localStorage.getItem("sf_admin") === "true";
export const adminLogout = () => localStorage.removeItem("sf_admin");