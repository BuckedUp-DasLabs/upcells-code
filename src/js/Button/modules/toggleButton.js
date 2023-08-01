const toggleButton = () => {
  buyButton.forEach((btn) => {
    btn.classList.toggle("btn-lock");
    btn.toggleAttribute("btn-lock");
  });
};

export default toggleButton;
