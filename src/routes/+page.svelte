<script>
  import { base } from "$app/paths";
</script>

<main class="mainContent">
  <h1 class="welcome">Hey There</h1>
  <h4 class="welcome">Thank you for visiting!</h4>
  <img src="{base}/images/me2.png" alt="My cartoon" id="meCartoon" />
  <!-- <p>Welcome to my blog! My name is Kudzai and I am a network work engineer in training. I am passionate about programming and cybersecurity, and I am excited to share my knowledge and experiences with you through this blog. Here, you'll find articles on the topics I am currently learning and my interests. I hope you find my posts informative and engaging, and I welcome any feedback or questions you may have. Thanks for visiting!</p> -->

  <div class="mainText">
      <p class="textBox">Welcome to my blog! I am a network engineer in training, with a strong interest in both programming and cybersecurity. This blog share my learning journey and experiences as I progress in these fields. I will be covering a wide range of topics related to network engineering, programming, and cybersecurity.</p>

      <p class="textBox">As a network engineer, I will be sharing my insights on the latest networking technologies and protocols, as well as tips and tricks for troubleshooting and optimizing network performance. I will also be discussing the importance of security in networking and how to secure your network infrastructure.</p>

      <p class="textBox">
          As a programmer, I will be sharing my knowledge and experience in various programming languages, frameworks, and tools. I will be discussing the latest trends and best practices in software development, as well as tips and tricks for debugging and optimizing your code.
      </p>

      <p class="textBox">
          In the field of cybersecurity, I will be sharing my understanding of the latest threats and vulnerabilities, and providing tips and advice on how to protect your systems and networks from cyber attacks. I will also be discussing my personal projects and interests in this field, such as ethical hacking and penetration testing.
      </p>

      <p class="textBox">
          My goal for this blog is to create a valuable resource for others who share my passions, and to document my own progress and learning experiences. I hope that my insights and experiences can help others who are also interested in network engineering, programming, and cybersecurity. Thank you for visiting and I hope you enjoy reading my blog!
      </p>
  </div>
</main>

<style>
  .mainContent{
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 75vh;
  }
  .welcome{
      font-family: "Major Mono Display", cursive;
  }
  .mainText {
      text-align: justify;
      display: flex;
      flex-direction: column;
      width: 70%;
      font-family: 'JetBrains Mono', monospace;
  }

  #meCartoon {
      border-radius: 50%;
      width: 100px;
      height: 100px;
  }

</style>
