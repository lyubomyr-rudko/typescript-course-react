import { useEffect, useState } from "react";

export function CustomHookDemo() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <section className="row">
        <span>Width</span>
        <input type="text" value={width} disabled />
      </section>
    </>
  );
}

// export function CustomHookDemo() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   });

//   const title = useFormInput("Heading");
//   const designation = useFormInput("Software Engineer");
//   useDocumentTitle(title.value);

//   return (
//     <>
//       <section className="row">
//         <span>Title</span>
//         <input {...title} />
//       </section>
//       <section className="row">
//         <span>Designation</span>
//         <input {...designation} />
//       </section>
//       <section className="row">
//         <span>Width</span>
//         <input type="text" value={width} disabled />
//       </section>
//     </>
//   );
// }
