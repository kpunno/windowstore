document.addEventListener("DOMContentLoaded", () => {
  // dropdown list of saved sessions
  
  const ddl=document.getElementById('dropdown');
  ddl.addEventListener("change", function () {
    var selectedValue = this.value;
    console.log("Selected option:", selectedValue);
  });

});
