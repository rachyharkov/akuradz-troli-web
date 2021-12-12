function tampilkanKatalog()
{
    const page = document.getElementById("btnkatalog").getAttribute("href").substr(1);

    if(page == "")
    {
        page = "home";
    }
    loadPage(page);

    function loadPage(page)
    {
        var xhttp = new XMLHttpRequest();

        xhttp.onloadstart = function () 
        {
            var content = document.querySelector("#body-content");
            content.innerHTML = "<div class='container' style='height: 768px; text-align: center;'><h4>Mohon Tunggu</h4><div>";
        }

        xhttp.onreadystatechange = function()
        {

            if(this.readyState === 4)
            {
                var content = document.querySelector("#body-content");
                if(this.status === 200)
                {
                    content.innerHTML = xhttp.responseText;
                }
                else if(this.status === 404)
                {
                    content.innerHTML = "<div class='container' style='height: 768px;'><h2>Halaman yang anda cari tidak ditemukan :(</h2><div>";
                }
                else
                {
                    content.innerHTML = "<div class='container' style='height: 768px;'><h2>Halaman tidak dapat dimuat, cek koneksi anda</h2><div>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
};