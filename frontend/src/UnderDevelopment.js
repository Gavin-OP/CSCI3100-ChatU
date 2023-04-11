export function UnderDevelopment() {
    function linktoLogin() {
        setTimeout("window.location.href='/login'", 5000);
        
    }   
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                
                &nbsp;<img src='../logo_colorful.svg' style={{ height: 200, alignItems: "center" }} 
                onLoad={linktoLogin} className='center' alt='logo'>
                    </img>&nbsp;
                    <h2 style={{ textAlign: "center" }}>Please wait... We are directing you to the login page </h2>
            </div>
        </>
    )
}