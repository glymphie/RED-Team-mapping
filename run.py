#!/usr/bin/env python
import argparse
from http.server import SimpleHTTPRequestHandler, HTTPServer


def user_input():
    parser = argparse.ArgumentParser(description="Run a simple http server")
    parser.add_argument('port', type=int, nargs='?', default=8080, help='Default: 8080')
    args = parser.parse_args()
    return args

def run(port, server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

def main():
    args = user_input()
    port = args.port

    print(f"Server Running at {port}")

    run(port)

    print(f"Server Shut down")


if __name__ == "__main__":
    main()
