export function showNotification(message, isSuccess = true) {
  const msgElement = document.getElementById("message");
  msgElement.innerText = message;
  msgElement.style.color = isSuccess ? "green" : "red";
 
}
