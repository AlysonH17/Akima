import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';

export interface CartItem {
  id: string;
  product: Product;
  customization: {
    normalYarnColors: string[];
    doubleStrandColors: string[];
  };
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsOrderModalOpen(true);
  };

  const colorPalette = {
    'Rosa': '#FFB6C1',
    'Azul': '#87CEEB',
    'Verde': '#98FB98',
    'Amarillo': '#FFFFE0',
    'Morado': '#DDA0DD',
    'Blanco': '#FFFFFF',
    'Negro': '#2F2F2F',
    'Rojo': '#FFB6C1',
    'Naranja': '#FFD700',
    'Gris': '#D3D3D3',
    'Beige': '#F5F5DC',
    'Café': '#D2B48C'
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrito de Compras
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
                <Button onClick={onClose} className="mt-4">
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{item.product.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {item.product.category}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm">Hilo normal:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.customization.normalYarnColors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-border"
                                    style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                                    title={color}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {item.customization.doubleStrandColors.length > 0 && (
                              <div>
                                <p className="text-sm">Hilo dos hebras:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.customization.doubleStrandColors.map((color, index) => (
                                    <div
                                      key={index}
                                      className="w-4 h-4 rounded-full border-2 border-border"
                                      style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                                      title={color}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-medium">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Continuar comprando
                    </Button>
                    <Button onClick={handleCheckout} className="flex-1">
                      Realizar pedido
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>¡Pedido recibido!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Gracias por tu pedido. Nos pondremos en contacto contigo para coordinar los detalles.</p>
              <p className="text-sm text-muted-foreground">
                Total: ${total.toLocaleString()}
              </p>
              <Button 
                onClick={() => {
                  setIsOrderModalOpen(false);
                  onClose();
                }} 
                className="w-full"
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}