export function removeToken() {
    const abc = localStorage.getItem("currentUser");
    if (abc != null) {
        localStorage.removeItem("currentUser")
         localStorage.removeItem("token")
        
    }
    return true
}