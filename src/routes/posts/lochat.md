Introducing Lochat, a small python chat app that lets you chat with people on your local network. Lochat is multithreaded - both the server and client are capable of running multiple threads to process messages simultaneously. This means that you can receive messages and respond to them in real-time without any delays or blocking.

If you're interested in building a multithreaded chat app in Python or just want to see how it's done, read on to learn more about Lochat and its unique features

## Architecture and Design: The Server
```python
import socket
import threading
import time
import sys

class ThreadedServer(object):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((self.host, self.port))
        self.Clients = []
        #timeout 
        self.sock.settimeout(1)
        #had to make this so listen() stops looping when there are 0 clients online after they disconnect
        self.Running = True

    def listen(self):
        self.sock.listen(5)
        while self.Running:
            try:
                client, address = self.sock.accept()
            except socket.timeout:
                continue
            except KeyboardInterrupt:
                sys.exit()
            #added another exception for Ctrl+C and close all sockets
            #add connected clients list
            self.Clients.append((client, address))
            #timeout so our thread sleeps and allows another thread to run
            client.settimeout(1)
            client.sendall('Welcome to LoChat!'.encode())
            print(f"Connected to: {address[0]}, {address[1]}")
            threading.Thread(target = self.listenToClient,args = (client,address)).start()
        print("Exited Gracefully! Bye :)")

    def listenToClient(self, client, address):
        size = 1024
        while True:
            try:
                data = client.recv(size)
                received_msg = data.decode()
                if not received_msg:
	                #this means the client disconnected
                    self.Clients.remove((client, address))
                    client.close()
                    print(f"Client disconnected: {address[0]}:{address[1]}")
                    print(f"{len(self.Clients)} client/s online")
                    #if there are no more clients, Stop listening
                    if len(self.Clients) < 1:
                        self.Running = False
                        print(f"Running is now {self.Running}")
                    return False
                elif received_msg:
                    # respond, blue ticks (WhatsApp reference)
                    response = f'\nMessage Received'.encode()
                    print(f'\nReceived: {received_msg}\nFrom: {address[0]}:{address[1]}')
                    client.sendall(response)
                    for clt in self.Clients:
                        #if clt != (client, address): had to Tweak
                        # if the ip are diff; or ; Ip are same and port diff
                        if (clt[1][0] != address[0]) or ((clt[1][0] == address[0]) and (clt[1][1] != address[1])):
                            clt[0].sendall(f'\nFrom {address[0]}: {received_msg}'.encode())
                        #[( soc, (ip,port) )] ==> self.Clients
            except (socket.timeout, ConnectionResetError):
                #We are timing out because of the settimeout method on the sockets from both the server and client
                continue
```
The server is initiated using a ThreadedServer class that takes in the host IP address and port number as arguments. This class creates a socket object that listens for incoming connections from clients. Upon accepting a new connection, a new thread is spawned to handle incoming messages from that client. The main thread continues to listen for incoming connections from other clients.

The server's main thread keeps running in a while loop and listens for incoming connections using the socket's listen() method. Once a connection is made, the client's socket object is added to the server's list of clients. The client's socket object is then passed on to a separate thread that listens for incoming messages.

To avoid blocking the main thread, the listenToClient method of the ThreadedServer class listens to client messages in a separate thread. The method continuously listens for incoming messages using the client's socket object and processes them accordingly. If the message is empty, it removes the client from the server's list of clients and closes the connection. If the message is not empty, the server sends an acknowledgment message back to the client and forwards the message to all other connected clients.

To handle unexpected disconnections, the server sets a timeout value for the client's socket object, so if a client does not respond within the specified time, the server skips over that client and continues listening for messages from other clients.

In summary, the server's architecture is designed to enable simultaneous communication between multiple clients while minimizing blocking and optimizing performance.

![Server in action!](/serverImg.png)

This code copied and tweaked from this [stackoverflow](https://stackoverflow.com/questions/23828264/how-to-make-a-simple-multithreaded-socket-server-in-python-that-remembers-client) post.
## The Threaded Client
```python
import socket
import sys
import threading
import time

# define the server's IP address and port number
SERVER_HOST = '192.168.8.110'  # replace with the server's IP address
SERVER_PORT = 4444  # replace with the server's port number

# create a new socket object using the IPv4 address family and TCP protocol
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# connect to the server
client_socket.connect((SERVER_HOST, SERVER_PORT))

#set a timeout so its non-blocking
client_socket.settimeout(1)

# need 2 threads, 1 for user input and 1 for receiving data from server
def InputThread():
    while True:
        message = input('Enter a Message: ')
        if message == ":q":
            client_socket.close()
            break
        client_socket.sendall(message.encode())
        time.sleep(0.5)

def ReceiveMsgs():
    while True:
        try:
            data = client_socket.recv(1024)
            message = data.decode()
            # if not message:
            #     client_socket.close()
            #     break
            print(message)
        except TimeoutError:
            continue
        except OSError:
            print("exiting...")
            client_socket.close()
            sys.exit()
        
    # except:
    #     # print("\nAn Expection occured!")
    #     continue
print("Creating and running threads!")
Input_thread = threading.Thread(target=InputThread)
Receive_Msgs = threading.Thread(target=ReceiveMsgs)

Receive_Msgs.start()
#give time to make connection and get welcome message from server
time.sleep(0.5)
Input_thread.start()
```
Firstly, the server's IP address and port number are defined. A new socket object is created using the IPv4 address family and TCP protocol. Then, the client connects to the server using the connect() method. A timeout is set so that it is non-blocking.

There are two threads in the program. The first thread (InputThread) listens for input from the user and sends it to the server using the sendall() method. If the user enters ":q", the client socket is closed and the loop is broken. The second thread (ReceiveMsgs) listens for data from the server using the recv() method. The received data is then decoded and printed to the console.

If there is a timeout or OSError, the program will handle the exceptions appropriately. Finally, the threads are started using the start() method.

![Threaded client!](/clientImg.png)

Overall, this code creates a multi-threaded client that allows for simultaneous sending and receiving of data to and from the server.

You can download my project on my [github](https://github.com/alp-kudzai/localChat).

If you spot an error or you have a suggestion please reach out on my [email](alpha.kudzai@gmail.com)