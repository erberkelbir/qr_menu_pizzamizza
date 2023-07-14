$(document).ready(function() {

  // Add to Cart button click event
  $(".buton").on("click", function() {
    // Get the pizza details
    var pizzaName = $(this).closest(".card-body").find(".card-title").text();
    var pizzaPrice = $(this).closest(".card-body").find(".card-text:eq(1)").text();
    var priceAsNumber = Number(pizzaPrice.replace(/[^0-9.-]+/g,"")); // Removes "$" and formats as Number

    // Add the price of the added item to the total
    var totalPriceElement = $('.total-price');
    var previousTotal = Number(totalPriceElement.text().replace(/[^0-9.-]+/g,"")); // Removes "Total: $" and formats as Number
    var newTotal = previousTotal + priceAsNumber;
    totalPriceElement.text('Total:' + newTotal.toFixed(2));

    // Create a new cart item element
    var cartItem = $("<li>").addClass("mb-2").text(pizzaName + " - " + pizzaPrice);
    // Add a remove button next to the cart item
    const currentURL = window.location.href;
    if (currentURL.includes('/tr')) {
      var removeButton = $("<button>").addClass("btn btn-danger btn-sm ml-2 remove-item").text("Kaldır");
    }else{
      var removeButton = $("<button>").addClass("btn btn-danger btn-sm ml-2 remove-item").text("Remove");

    }
    
    cartItem.append(removeButton);
    // Add the cart item to the cart
    $("#cart-items").append(cartItem);
});

  // Remove button click event
  $(document).on("click", ".remove-item", function() {
    // Get the price of the item to be removed
    var itemPriceText = $(this).closest("li").text().split(' - ')[1];
    var itemPrice = Number(itemPriceText.replace(/[^0-9.-]+/g,"")); // Removes "$" and formats as Number

    // Subtract the price of the removed item from the total
    var totalPriceElement = $('.total-price');
    var currentTotal = Number(totalPriceElement.text().replace(/[^0-9.-]+/g,"")); // Removes "Total: $" and formats as Number
    var newTotal = currentTotal - itemPrice;
    totalPriceElement.text('Total:' + newTotal.toFixed(2));

    // Remove the cart item from the cart
    $(this).closest("li").remove();
});

  // Place Order button click event
  $("#place-order").on("click", function() {
    // Replace the phone number with your actual WhatsApp number
    var phoneNumber = "+905383213410";
    
    // Initialize the message
    var message = "Hello, I want to order:%0D%0A\n";
    var pizzaList = {};
  
    // Iterate over the cart items
    $("#cart-items li").each(function() {
      // Get pizza name without price and button text
      var pizzaName = $(this).clone().children().remove().end().text().split(' - ')[0].trim();
  
      // Count pizzas
      if (pizzaList[pizzaName]) {
        pizzaList[pizzaName]++;
      } else {
        pizzaList[pizzaName] = 1;
      }
    });
  
    // Append pizza names and quantities to the message
    $.each(pizzaList, function(pizzaName, quantity) {
      message += encodeURIComponent(quantity + "x " + pizzaName) + "%0D%0A\n";
    });
  
    // Redirect to WhatsApp with the pre-filled message
    window.location.href = "https://wa.me/" + phoneNumber + "?text=" + message;
  });

  document.getElementById('translateButton').addEventListener('click', function() {
    const currentURL = window.location.href;
    
    if (currentURL.includes('/tr')) {
      // Redirect to the English version
      window.location.href = '/';
    } else {
      // Redirect to the Turkish version
      window.location.href = '/tr';
    }
  });

});