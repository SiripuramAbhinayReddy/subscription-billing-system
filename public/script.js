function selectPlan(element, planName) {
    document.querySelectorAll(".plan").forEach(plan => {
        plan.classList.remove("selected");
    });

    element.classList.add("selected");

    const payBtn = document.getElementById("payBtn");
    payBtn.textContent = `Proceed with ${planName} Plan`;
    payBtn.classList.add("active");
    payBtn.disabled = false;
}


const stripe = Stripe("pk_test_51Rjg5PD51cwiE7ifM8LvId2j6kBHfgQe9RbqUlaKdOpqPZUu0PeMW08W4kL1uYTIo6ENMsNfT9er3B2nIHhXf8Cm00XCkGF8oQ");

const payBtn = document.getElementById("payBtn").addEventListener("click", async () => {
    const selectedPlan = document.querySelector(".plan.selected h3").innerText;
    // const plan = document.getElementById("payBtn").getAttribute("data-plan");
    console.log("Selected Plan:", selectedPlan);
    const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
    });

    const session = await response.json();
    console.log("Stripe session response:", session);
    window.location.href = session.url;
});

