<script>
    import { base } from "$app/paths";

    // export let data

    const Articles = {
        "posts": {
            1: {
                1: "My Mission",
                2: "A quick run through my journey and my goals",
                3: "TBA",
                4: ['/posts/first-post', './first-post']
            },
            2: {
                1: "Just a Test",
                2: "really testing over here",
                3: "Today!",
                4: ['/posts/testing', './testing']
            },
        },
        "len": 2
    }
</script>

<main>
    <h1 id="comingSoon">Posts Coming Soon...</h1>
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
        display: none;
    }
    #comingSoon {
        font-family: 'Major Mono Display', cursive;
    }
</style>
