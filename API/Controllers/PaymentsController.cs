using API.Data;
using API.Dtos;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController(
    PaymentsService paymentService,
    StoreContext context) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets
            .GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null)
        {
            return BadRequest("Problem with the basket");
        }

        var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null)
        {
            return BadRequest("Problem creating payment intent");
        }

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest("Problem updating basket with intent");
            }
        }

        return basket.ToDto();
    }
}