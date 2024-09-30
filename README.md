# Simple CORS Proxy

A simple CORS proxy built with Node.js and Express. This application allows you to bypass CORS restrictions by forwarding requests to a specified URL.

## Features

- Bypass CORS restrictions for any URL.
- Simple and easy to use.
- Configurable port.
- Supports both HTTP and HTTPS requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/simple-cors-proxy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-cors-proxy
   ```

3. Install the dependencies using Yarn:

   ```bash
   yarn install
   ```

## Usage

1. Start the server:

   ```bash
   yarn start
   ```

   Alternatively, for development with auto-reloading:

   ```bash
   yarn dev
   ```

2. The server will run on the specified port (default is 8371). You can change the port by setting the `SIMPLE_CORS_PROXY_PORT` environment variable.

## API

To use the CORS proxy, make a GET request to the root endpoint with the target URL as a query parameter.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.