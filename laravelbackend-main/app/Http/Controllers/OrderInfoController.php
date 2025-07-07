<?php
namespace App\Http\Controllers;

use App\Models\OrderInfo;
use Illuminate\Http\Request;

class OrderInfoController extends Controller
{
    public function index()
    {
     return response()->json(
    OrderInfo::with(['product'])->latest()->paginate(10)
);
    }
public function product()
{
    return $this->belongsTo(ProductInfo::class, 'product_id');
}
   public function store(Request $request)
    {
        // Verify the authenticated user
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Validate the request data
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products_info,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'delivery_address' => 'required|string',
            'payment_method' => 'required|string'
        ]);

        // Verify the authenticated user matches the request user_id
        if ($user->id != $request->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Create orders for each item
        $orders = [];
        foreach ($validated['items'] as $item) {
            $order = OrderInfo::create([
                'user_id' => $validated['user_id'],
                'product_id' => $item['product_id'],
                'location' => $validated['delivery_address'],
                'total_amount' => $item['price'] * $item['quantity'],
                'quantity' => $item['quantity'],
                'payment_method' => $validated['payment_method']
            ]);
            
            $orders[] = $order;
            $this->sendOrderNotification($order);
        }

        return response()->json($orders, 201);
    }
    public function show($id)
    {
        $order = $order = OrderInfo::with(['product'])->find($id);
        return $order
            ? response()->json($order)
            : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $order = OrderInfo::find($id);
        if (!$order) return response()->json(['message' => 'Not Found'], 404);

        $order->update($request->all());

        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = OrderInfo::find($id);
        if (!$order) return response()->json(['message' => 'Not Found'], 404);

        $order->delete();

        return response()->json(['message' => 'Deleted']);
    }
    private function sendOrderNotification($order)
{
    // Get admin user (assuming there's one with role 'admin')
    $admin = User::where('role', 'admin')->first();
    
    if ($admin && $admin->fcm_token) {
        // Implement actual FCM sending here
        // This is a simplified version - you'll need to implement proper FCM service
        
        $data = [
            'to' => $admin->fcm_token,
            'notification' => [
                'title' => 'New Order Received',
                'body' => "Order #{$order->id} has been placed",
                'sound' => 'default'
            ],
            'data' => [
                'order_id' => $order->id,
                'type' => 'new_order'
            ]
        ];
        
        // Use Laravel HTTP client or Guzzle to send to FCM
        // This is just a placeholder
        Http::post('https://fcm.googleapis.com/fcm/send', $data);
    }
}
}

