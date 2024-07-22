import Cookies from "js-cookie";
export default function isAuthenticated() {
    return !!Cookies.get('token')
}
