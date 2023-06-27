const urlParams = new URLSearchParams(window.location.search);
urlParams.delete("step_count");
urlParams.delete("step_code");
urlParams.delete("from");
urlParams.delete("to");
urlParams.delete("product1");
urlParams.delete("product0");
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);
const orderID = urlParams.get("order_uuid");
