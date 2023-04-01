import{S as ss,i as as,s as ts,k as p,q as l,a as u,l as o,m as c,r as i,h as s,c as r,n as k,I as Yn,b as t,D as e,B as Sn}from"./index-c14fe24a.js";import{c as Jn}from"./shared-23917130.js";function es(Qn){let d,pn,q,b,on,D,T,cn,H,f,Xn=`<code class="language-python"><span class="token keyword">import</span> socket
<span class="token keyword">import</span> threading
<span class="token keyword">import</span> time
<span class="token keyword">import</span> sys

<span class="token keyword">class</span> <span class="token class-name">ThreadedServer</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>host <span class="token operator">=</span> host
        self<span class="token punctuation">.</span>port <span class="token operator">=</span> port
        self<span class="token punctuation">.</span>sock <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>sock<span class="token punctuation">.</span>setsockopt<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>SOL_SOCKET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SO_REUSEADDR<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>sock<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>host<span class="token punctuation">,</span> self<span class="token punctuation">.</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>Clients <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token comment">#timeout </span>
        self<span class="token punctuation">.</span>sock<span class="token punctuation">.</span>settimeout<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token comment">#had to make this so listen() stops looping when there are 0 clients online after they disconnect</span>
        self<span class="token punctuation">.</span>Running <span class="token operator">=</span> <span class="token boolean">True</span>

    <span class="token keyword">def</span> <span class="token function">listen</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>sock<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
        <span class="token keyword">while</span> self<span class="token punctuation">.</span>Running<span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                client<span class="token punctuation">,</span> address <span class="token operator">=</span> self<span class="token punctuation">.</span>sock<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">except</span> socket<span class="token punctuation">.</span>timeout<span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token keyword">except</span> KeyboardInterrupt<span class="token punctuation">:</span>
                sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment">#added another exception for Ctrl+C and close all sockets</span>
            <span class="token comment">#add connected clients list</span>
            self<span class="token punctuation">.</span>Clients<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">#timeout so our thread sleeps and allows another thread to run</span>
            client<span class="token punctuation">.</span>settimeout<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
            client<span class="token punctuation">.</span>sendall<span class="token punctuation">(</span><span class="token string">'Welcome to LoChat!'</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Connected to: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
            threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target <span class="token operator">=</span> self<span class="token punctuation">.</span>listenToClient<span class="token punctuation">,</span>args <span class="token operator">=</span> <span class="token punctuation">(</span>client<span class="token punctuation">,</span>address<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Exited Gracefully! Bye :)"</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">listenToClient</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> client<span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">:</span>
        size <span class="token operator">=</span> <span class="token number">1024</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                data <span class="token operator">=</span> client<span class="token punctuation">.</span>recv<span class="token punctuation">(</span>size<span class="token punctuation">)</span>
                received_msg <span class="token operator">=</span> data<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token keyword">not</span> received_msg<span class="token punctuation">:</span>
	                <span class="token comment">#this means the client disconnected</span>
                    self<span class="token punctuation">.</span>Clients<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    client<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Client disconnected: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>Clients<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string"> client/s online"</span></span><span class="token punctuation">)</span>
                    <span class="token comment">#if there are no more clients, Stop listening</span>
                    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>Clients<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
                        self<span class="token punctuation">.</span>Running <span class="token operator">=</span> <span class="token boolean">False</span>
                        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Running is now </span><span class="token interpolation"><span class="token punctuation">&#123;</span>self<span class="token punctuation">.</span>Running<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token boolean">False</span>
                <span class="token keyword">elif</span> received_msg<span class="token punctuation">:</span>
                    <span class="token comment"># respond, blue ticks (WhatsApp reference)</span>
                    response <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f'&#92;nMessage Received'</span></span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'&#92;nReceived: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>received_msg<span class="token punctuation">&#125;</span></span><span class="token string">&#92;nFrom: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>
                    client<span class="token punctuation">.</span>sendall<span class="token punctuation">(</span>response<span class="token punctuation">)</span>
                    <span class="token keyword">for</span> clt <span class="token keyword">in</span> self<span class="token punctuation">.</span>Clients<span class="token punctuation">:</span>
                        <span class="token comment">#if clt != (client, address): had to Tweak</span>
                        <span class="token comment"># if the ip are diff; or ; Ip are same and port diff</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>clt<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">or</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>clt<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span>clt<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> address<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                            clt<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>sendall<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'&#92;nFrom </span><span class="token interpolation"><span class="token punctuation">&#123;</span>address<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>received_msg<span class="token punctuation">&#125;</span></span><span class="token string">'</span></span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token comment">#[( soc, (ip,port) )] ==> self.Clients</span>
            <span class="token keyword">except</span> <span class="token punctuation">(</span>socket<span class="token punctuation">.</span>timeout<span class="token punctuation">,</span> ConnectionResetError<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token comment">#We are timing out because of the settimeout method on the sockets from both the server and client</span>
                <span class="token keyword">continue</span></code>`,K,_,ln,U,E,un,V,I,rn,G,P,kn,W,R,dn,B,S,C,Cn,N,m,mn,g,hn,fn,Y,x,gn,J,v,Zn=`<code class="language-python"><span class="token keyword">import</span> socket
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> threading
<span class="token keyword">import</span> time

<span class="token comment"># define the server's IP address and port number</span>
SERVER_HOST <span class="token operator">=</span> <span class="token string">'192.168.8.110'</span>  <span class="token comment"># replace with the server's IP address</span>
SERVER_PORT <span class="token operator">=</span> <span class="token number">4444</span>  <span class="token comment"># replace with the server's port number</span>

<span class="token comment"># create a new socket object using the IPv4 address family and TCP protocol</span>
client_socket <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
client_socket<span class="token punctuation">.</span>setsockopt<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>SOL_SOCKET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SO_REUSEADDR<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># connect to the server</span>
client_socket<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span>SERVER_HOST<span class="token punctuation">,</span> SERVER_PORT<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">#set a timeout so its non-blocking</span>
client_socket<span class="token punctuation">.</span>settimeout<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># need 2 threads, 1 for user input and 1 for receiving data from server</span>
<span class="token keyword">def</span> <span class="token function">InputThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        message <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">'Enter a Message: '</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> message <span class="token operator">==</span> <span class="token string">":q"</span><span class="token punctuation">:</span>
            client_socket<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        client_socket<span class="token punctuation">.</span>sendall<span class="token punctuation">(</span>message<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">ReceiveMsgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> client_socket<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>
            message <span class="token operator">=</span> data<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment"># if not message:</span>
            <span class="token comment">#     client_socket.close()</span>
            <span class="token comment">#     break</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
        <span class="token keyword">except</span> TimeoutError<span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        <span class="token keyword">except</span> OSError<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"exiting..."</span><span class="token punctuation">)</span>
            client_socket<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        
    <span class="token comment"># except:</span>
    <span class="token comment">#     # print("&#92;nAn Expection occured!")</span>
    <span class="token comment">#     continue</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Creating and running threads!"</span><span class="token punctuation">)</span>
Input_thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>InputThread<span class="token punctuation">)</span>
Receive_Msgs <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>ReceiveMsgs<span class="token punctuation">)</span>

Receive_Msgs<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">#give time to make connection and get welcome message from server</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>
Input_thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`,Q,O,vn,X,j,yn,Z,A,wn,$,M,L,xn,nn,z,bn,sn,h,Tn,y,_n,En,an,w,In,F,Pn;return{c(){d=p("p"),pn=l("Introducing Lochat, a small python chat app that lets you chat with people on your local network. Lochat is multithreaded - both the server and client are capable of running multiple threads to process messages simultaneously. This means that you can receive messages and respond to them in real-time without any delays or blocking."),q=u(),b=p("p"),on=l("If you’re interested in building a multithreaded chat app in Python or just want to see how it’s done, read on to learn more about Lochat and its unique features"),D=u(),T=p("h2"),cn=l("Architecture and Design: The Server"),H=u(),f=p("pre"),K=u(),_=p("p"),ln=l("The server is initiated using a ThreadedServer class that takes in the host IP address and port number as arguments. This class creates a socket object that listens for incoming connections from clients. Upon accepting a new connection, a new thread is spawned to handle incoming messages from that client. The main thread continues to listen for incoming connections from other clients."),U=u(),E=p("p"),un=l("The server’s main thread keeps running in a while loop and listens for incoming connections using the socket’s listen() method. Once a connection is made, the client’s socket object is added to the server’s list of clients. The client’s socket object is then passed on to a separate thread that listens for incoming messages."),V=u(),I=p("p"),rn=l("To avoid blocking the main thread, the listenToClient method of the ThreadedServer class listens to client messages in a separate thread. The method continuously listens for incoming messages using the client’s socket object and processes them accordingly. If the message is empty, it removes the client from the server’s list of clients and closes the connection. If the message is not empty, the server sends an acknowledgment message back to the client and forwards the message to all other connected clients."),G=u(),P=p("p"),kn=l("To handle unexpected disconnections, the server sets a timeout value for the client’s socket object, so if a client does not respond within the specified time, the server skips over that client and continues listening for messages from other clients."),W=u(),R=p("p"),dn=l("In summary, the server’s architecture is designed to enable simultaneous communication between multiple clients while minimizing blocking and optimizing performance."),B=u(),S=p("p"),C=p("img"),N=u(),m=p("p"),mn=l("This code copied and tweaked from this "),g=p("a"),hn=l("stackoverflow"),fn=l(" post."),Y=u(),x=p("h2"),gn=l("The Threaded Client"),J=u(),v=p("pre"),Q=u(),O=p("p"),vn=l("Firstly, the server’s IP address and port number are defined. A new socket object is created using the IPv4 address family and TCP protocol. Then, the client connects to the server using the connect() method. A timeout is set so that it is non-blocking."),X=u(),j=p("p"),yn=l("There are two threads in the program. The first thread (InputThread) listens for input from the user and sends it to the server using the sendall() method. If the user enters “:q”, the client socket is closed and the loop is broken. The second thread (ReceiveMsgs) listens for data from the server using the recv() method. The received data is then decoded and printed to the console."),Z=u(),A=p("p"),wn=l("If there is a timeout or OSError, the program will handle the exceptions appropriately. Finally, the threads are started using the start() method."),$=u(),M=p("p"),L=p("img"),nn=u(),z=p("p"),bn=l("Overall, this code creates a multi-threaded client that allows for simultaneous sending and receiving of data to and from the server."),sn=u(),h=p("p"),Tn=l("You can download my project on my "),y=p("a"),_n=l("github"),En=l("."),an=u(),w=p("p"),In=l("If you spot an error or you have a suggestion please reach out on my [email]"),F=p("a"),Pn=l("alpha.kudzai@gmail.com"),this.h()},l(n){d=o(n,"P",{});var a=c(d);pn=i(a,"Introducing Lochat, a small python chat app that lets you chat with people on your local network. Lochat is multithreaded - both the server and client are capable of running multiple threads to process messages simultaneously. This means that you can receive messages and respond to them in real-time without any delays or blocking."),a.forEach(s),q=r(n),b=o(n,"P",{});var On=c(b);on=i(On,"If you’re interested in building a multithreaded chat app in Python or just want to see how it’s done, read on to learn more about Lochat and its unique features"),On.forEach(s),D=r(n),T=o(n,"H2",{});var jn=c(T);cn=i(jn,"Architecture and Design: The Server"),jn.forEach(s),H=r(n),f=o(n,"PRE",{class:!0});var $n=c(f);$n.forEach(s),K=r(n),_=o(n,"P",{});var An=c(_);ln=i(An,"The server is initiated using a ThreadedServer class that takes in the host IP address and port number as arguments. This class creates a socket object that listens for incoming connections from clients. Upon accepting a new connection, a new thread is spawned to handle incoming messages from that client. The main thread continues to listen for incoming connections from other clients."),An.forEach(s),U=r(n),E=o(n,"P",{});var Mn=c(E);un=i(Mn,"The server’s main thread keeps running in a while loop and listens for incoming connections using the socket’s listen() method. Once a connection is made, the client’s socket object is added to the server’s list of clients. The client’s socket object is then passed on to a separate thread that listens for incoming messages."),Mn.forEach(s),V=r(n),I=o(n,"P",{});var Ln=c(I);rn=i(Ln,"To avoid blocking the main thread, the listenToClient method of the ThreadedServer class listens to client messages in a separate thread. The method continuously listens for incoming messages using the client’s socket object and processes them accordingly. If the message is empty, it removes the client from the server’s list of clients and closes the connection. If the message is not empty, the server sends an acknowledgment message back to the client and forwards the message to all other connected clients."),Ln.forEach(s),G=r(n),P=o(n,"P",{});var zn=c(P);kn=i(zn,"To handle unexpected disconnections, the server sets a timeout value for the client’s socket object, so if a client does not respond within the specified time, the server skips over that client and continues listening for messages from other clients."),zn.forEach(s),W=r(n),R=o(n,"P",{});var Fn=c(R);dn=i(Fn,"In summary, the server’s architecture is designed to enable simultaneous communication between multiple clients while minimizing blocking and optimizing performance."),Fn.forEach(s),B=r(n),S=o(n,"P",{});var qn=c(S);C=o(qn,"IMG",{src:!0,alt:!0}),qn.forEach(s),N=r(n),m=o(n,"P",{});var tn=c(m);mn=i(tn,"This code copied and tweaked from this "),g=o(tn,"A",{href:!0,rel:!0});var Dn=c(g);hn=i(Dn,"stackoverflow"),Dn.forEach(s),fn=i(tn," post."),tn.forEach(s),Y=r(n),x=o(n,"H2",{});var Hn=c(x);gn=i(Hn,"The Threaded Client"),Hn.forEach(s),J=r(n),v=o(n,"PRE",{class:!0});var ns=c(v);ns.forEach(s),Q=r(n),O=o(n,"P",{});var Kn=c(O);vn=i(Kn,"Firstly, the server’s IP address and port number are defined. A new socket object is created using the IPv4 address family and TCP protocol. Then, the client connects to the server using the connect() method. A timeout is set so that it is non-blocking."),Kn.forEach(s),X=r(n),j=o(n,"P",{});var Un=c(j);yn=i(Un,"There are two threads in the program. The first thread (InputThread) listens for input from the user and sends it to the server using the sendall() method. If the user enters “:q”, the client socket is closed and the loop is broken. The second thread (ReceiveMsgs) listens for data from the server using the recv() method. The received data is then decoded and printed to the console."),Un.forEach(s),Z=r(n),A=o(n,"P",{});var Vn=c(A);wn=i(Vn,"If there is a timeout or OSError, the program will handle the exceptions appropriately. Finally, the threads are started using the start() method."),Vn.forEach(s),$=r(n),M=o(n,"P",{});var Gn=c(M);L=o(Gn,"IMG",{src:!0,alt:!0}),Gn.forEach(s),nn=r(n),z=o(n,"P",{});var Wn=c(z);bn=i(Wn,"Overall, this code creates a multi-threaded client that allows for simultaneous sending and receiving of data to and from the server."),Wn.forEach(s),sn=r(n),h=o(n,"P",{});var en=c(h);Tn=i(en,"You can download my project on my "),y=o(en,"A",{href:!0,rel:!0});var Bn=c(y);_n=i(Bn,"github"),Bn.forEach(s),En=i(en,"."),en.forEach(s),an=r(n),w=o(n,"P",{});var Rn=c(w);In=i(Rn,"If you spot an error or you have a suggestion please reach out on my [email]"),F=o(Rn,"A",{href:!0});var Nn=c(F);Pn=i(Nn,"alpha.kudzai@gmail.com"),Nn.forEach(s),Rn.forEach(s),this.h()},h(){k(f,"class","language-python"),Yn(C.src,Cn=Jn+"/images/serverImg.png")||k(C,"src",Cn),k(C,"alt","Server in action!"),k(g,"href","https://stackoverflow.com/questions/23828264/how-to-make-a-simple-multithreaded-socket-server-in-python-that-remembers-client"),k(g,"rel","nofollow"),k(v,"class","language-python"),Yn(L.src,xn=Jn+"/images/clientImg.png")||k(L,"src",xn),k(L,"alt","Threaded client!"),k(y,"href","https://github.com/alp-kudzai/localChat"),k(y,"rel","nofollow"),k(F,"href","mailto:alpha.kudzai@gmail.com")},m(n,a){t(n,d,a),e(d,pn),t(n,q,a),t(n,b,a),e(b,on),t(n,D,a),t(n,T,a),e(T,cn),t(n,H,a),t(n,f,a),f.innerHTML=Xn,t(n,K,a),t(n,_,a),e(_,ln),t(n,U,a),t(n,E,a),e(E,un),t(n,V,a),t(n,I,a),e(I,rn),t(n,G,a),t(n,P,a),e(P,kn),t(n,W,a),t(n,R,a),e(R,dn),t(n,B,a),t(n,S,a),e(S,C),t(n,N,a),t(n,m,a),e(m,mn),e(m,g),e(g,hn),e(m,fn),t(n,Y,a),t(n,x,a),e(x,gn),t(n,J,a),t(n,v,a),v.innerHTML=Zn,t(n,Q,a),t(n,O,a),e(O,vn),t(n,X,a),t(n,j,a),e(j,yn),t(n,Z,a),t(n,A,a),e(A,wn),t(n,$,a),t(n,M,a),e(M,L),t(n,nn,a),t(n,z,a),e(z,bn),t(n,sn,a),t(n,h,a),e(h,Tn),e(h,y),e(y,_n),e(h,En),t(n,an,a),t(n,w,a),e(w,In),e(w,F),e(F,Pn)},p:Sn,i:Sn,o:Sn,d(n){n&&s(d),n&&s(q),n&&s(b),n&&s(D),n&&s(T),n&&s(H),n&&s(f),n&&s(K),n&&s(_),n&&s(U),n&&s(E),n&&s(V),n&&s(I),n&&s(G),n&&s(P),n&&s(W),n&&s(R),n&&s(B),n&&s(S),n&&s(N),n&&s(m),n&&s(Y),n&&s(x),n&&s(J),n&&s(v),n&&s(Q),n&&s(O),n&&s(X),n&&s(j),n&&s(Z),n&&s(A),n&&s($),n&&s(M),n&&s(nn),n&&s(z),n&&s(sn),n&&s(h),n&&s(an),n&&s(w)}}}class cs extends ss{constructor(d){super(),as(this,d,null,es,ts,{})}}export{cs as default};
