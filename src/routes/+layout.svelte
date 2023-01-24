<script>
    import "@picocss/pico/css/pico.css";
    import { base } from "$app/paths";

    
    const links = [
        ['/', 'Home'],
        ['/posts', 'Posts']
    ]
    const footer_links = [
        ["https://twitter.com/KudzaiAlpha", "twitterLogo", "/images/Logo_blue.svg"],
        ["https://github.com/alp-kudzai", "githubLogo", "/images/github-mark-white.svg"],
        ["https://app.hackthebox.com/profile/1057326", "hackthebox_link", "/images/logo-htb.svg"],
        ["https://tryhackme.com/p/Alphly", "tryhackme", "/images/tryhackme_logo.png"],
        ["https://www.linkedin.com/in/kudzai-matsika-117698182/", "linkedin", "/images/LI-In-Bug.png"]
    ]
</script>

<nav aria-label="breadcrumb" id="navbar">
    <ul>
    {#each links as [path, name]}
        <li ><a class="nav-links" href={base+path}>{name}</a></li>
    {/each}
    </ul>
</nav>
<slot></slot>
<footer class="footer">
    <div class="socialMedia">
        {#each footer_links as [site, alt, lgo]}
            <a href={site} target="_blank" rel="noreferrer">
                <img class="socialLogo" src={base+lgo} alt={alt} />
            </a>
        {/each}
        <!-- <a href="https://twitter.com/KudzaiAlpha" target="_blank" id="twitterLogo">
            <img class="socialLogo" id="twitterLogo" src="/Logo_blue.svg" alt="twitter logo" />
        </a> -->
    </div>
    <div class="care">
        Made bumbling around in Svelte
    </div>
</footer>



<style>
    .nav-links {
        font-family: 'Nabla', cursive;
        font-size: 50px;
    }

    .footer {
        display: flex;
        flex: 0;
        flex-direction: column;
        width: 90%;
        justify-content: center;
        position: absolute;
        bottom: -5;
        z-index: 1;
    }

    .socialMedia, .care {
        display: flex;
        justify-content: center;
    }

    .socialLogo {
        height: 40px;
        width: 40px;
        padding: 15%;
        filter: grayscale(1);
        transition: filter 0.5s;
    }

    .socialLogo:hover {
        filter: grayscale(0);
    }
</style>