<script>
    import { base } from "$app/paths";

    // export let data

    const Articles = {
        "posts": {
            1: {
                1: "How to Build a Multithreaded Chat App in Python",
                2: "Lessons from Lochat",
                3: "2023-04-01",
                4: ['/posts/lochat', './lochat']
            },
        },
        "len": 1
    }
</script>

<main>
    <!-- <h1 id="comingSoon">Posts Coming Soon...</h1> -->
    {#each Object.entries(Articles["posts"]) as [k,v]}
        <article class="card">
            <h5 class="art_title"> {v[1]} </h5>
            <p class="art_descrip"> {v[2]}</p>
            <p class="art_time">{v[3]}</p>
            <a class="art_link" href={base+v[4][0]} >Read</a>
        </article>
    {/each}
    
</main>

<style>
    a {
        text-decoration: none;
    }
    .art_link{
        text-emphasis: bold;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .card {
        text-align: justify;
        width: 70%;
        /* display: none; */
    }
    /* #comingSoon {
        font-family: 'Major Mono Display', cursive;
    } */
</style>
