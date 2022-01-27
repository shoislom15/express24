const dnone = (arr) => {
  arr.map((item) => {
    item.classList.add("d-none");
  });
};
const dnoner = (arr) => {
  arr.map((item) => {
    item.classList.remove("d-none");
  });
};
export { dnone, dnoner };
