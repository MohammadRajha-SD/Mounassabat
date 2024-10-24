<?php

namespace App\Http\Controllers;

use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payer;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use Illuminate\Http\Request;

class PayPalController extends Controller
{
    private $apiContext;

    public function __construct()
    {
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                config('paypal.client_id'),
                config('paypal.secret')
            )
        );
        $this->apiContext->setConfig(config('paypal.settings'));
    }

    // Create a new payment
    public function createPayment(Request $request)
    {
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item = new Item();
        $item->setName($request->name)
             ->setCurrency('USD')
             ->setQuantity(1)
             ->setPrice($request->price);

        $itemList = new ItemList();
        $itemList->setItems([$item]);

        $amount = new Amount();
        $amount->setCurrency('USD')
               ->setTotal($request->price);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
                    ->setItemList($itemList)
                    ->setDescription('Payment description');

        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(url('/api/paypal/success'))
                     ->setCancelUrl(url('/api/paypal/cancel'));

        $payment = new Payment();
        $payment->setIntent('sale')
                ->setPayer($payer)
                ->setRedirectUrls($redirectUrls)
                ->setTransactions([$transaction]);

        try {
            $payment->create($this->apiContext);
            return response()->json(['approval_url' => $payment->getApprovalLink()]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Handle PayPal success
    public function paymentSuccess(Request $request)
    {
        $paymentId = $request->paymentId;
        $payment = Payment::get($paymentId, $this->apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($request->PayerID);

        try {
            $payment->execute($execution, $this->apiContext);
            return response()->json(['message' => 'Payment successful!']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Handle PayPal cancel
    public function paymentCancel()
    {
        return response()->json(['message' => 'Payment cancelled']);
    }
}
