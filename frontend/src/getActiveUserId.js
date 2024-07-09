import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"

const getUserIdFromToken = () => {
    const token = Cookies.get("accessToken")
    if(token) {
        try {
            
        } catch (error) {
            
        }
    }
}