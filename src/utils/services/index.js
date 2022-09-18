exports.checkLoginStatus = (setIsLoggedIn, setStartCheck) => {
    let token = localStorage.getItem('flyer-admin-token')
    let admin = localStorage.getItem('flyer-admin-data')
    admin = admin ? JSON.parse(admin) : admin
    
    if (!token || !admin || !admin.isLoggedIn) {
        setIsLoggedIn(false)
        setStartCheck(true)
    } else {
        setIsLoggedIn(true)
    }
}