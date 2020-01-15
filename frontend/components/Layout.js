import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <style jsx global>
        {`
          body {
            font-family: "Raleway", "Avenir next", Avenir, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }
          a {
            color: #212529;
          }
          .navbar {
            margin-bottom: 50px;
          }
          #nprogress .bar {
            height: 5px !important;
          }import Header2 from './Header2';

          .featured-image {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
          }
          .mark {
            background-color: #eee;
          }
          p img {
            width: 100%;
          }
          .ql-editor {
            height: 300px;
          }
          .form-control {
            height: calc(1.5em + 0.75rem + 6px);
          }
          .small-card {
            padding-bottom: 20px;
          }
          .small-card:hover {
            animation-name: shadow;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
          }
          .icon:hover {
            animation: icon 0.4s forwards;
          }
          @keyframes shadow {
            from {
              box-shadow: 0;
            }
            to {
              box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
          }
          @keyframes icon {
            from {
              color: #bbb;
            }
            to {
              color: #212529;
            }
          }
          
        `}
      </style>
    </React.Fragment>
  );
};

export default Layout;
