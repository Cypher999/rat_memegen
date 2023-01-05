/* eslint-disable jsx-a11y/alt-text */
function Header(arg){
    function lihat_klik(){
        console.log('Ter Klik');
    }
    return (
        <header>
            <img
                onClick={lihat_klik}
                src={arg.base_url+"meme-maker/troll.png"}
                width="50px"
                height="50px"
            />
            <h2>R@T MEMEGEN</h2>
            <p>Property By R@TDEV</p>
        </header>
    )
}

export default Header;