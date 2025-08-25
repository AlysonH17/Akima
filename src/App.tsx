/**
 * APLICACIÓN PRINCIPAL DE AKIMA - E-COMMERCE DE ROPA A CROCHET
 * 
 * Esta es la aplicación principal que contiene toda la lógica del sitio web.
 * Maneja el estado global, la navegación entre secciones y la funcionalidad del carrito.
 * 
 * Características principales:
 * - Catálogo de productos personalizables
 * - Sistema de carrito de compras
 * - Personalización de colores de hilos
 * - Diseño responsivo
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard, Product } from './components/ProductCard';
import { ProductCustomizer } from './components/ProductCustomizer';
import { Cart, CartItem } from './components/Cart';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Instagram, Facebook, MessageCircle, Heart, Sparkles, Users, Award } from 'lucide-react';

/**
 * DATOS DE PRODUCTOS MOCK
 * Aquí defines todos los productos disponibles en tu tienda.
 * Cada producto tiene información sobre colores de hilos disponibles y requerimientos.
 */
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Buzo Oversize',
    description: 'Buzo cómodo y moderno, perfecto para el día a día',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1679847628912-4c3e7402abc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc3dlYXRlciUyMGhhbmRtYWRlfGVufDF8fHx8MTc1NjA2Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Buzos',
    yarnRequirements: {
      normal: 2,      // Requiere 2 madejas de hilo normal
      doubleStrand: 2 // Requiere 2 madejas de hilo dos hebras
    },
    availableColors: {
      normal: ['Rosa', 'Azul', 'Verde', 'Blanco', 'Negro', 'Gris'],
      doubleStrand: ['Beige', 'Café', 'Morado', 'Amarillo', 'Rojo']
    }
  },
  {
    id: '2',
    name: 'Bikini Verano',
    description: 'Bikini tejido a mano, ideal para la playa',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1632224239327-acdcc0713dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmlraW5pJTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU2MDYzNzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Bikinis',
    yarnRequirements: {
      normal: 3,      // Solo requiere hilo normal
      doubleStrand: 0 // No requiere hilo dos hebras
    },
    availableColors: {
      normal: ['Rosa', 'Azul', 'Verde', 'Amarillo', 'Morado', 'Blanco'],
      doubleStrand: [] // Array vacío porque no usa hilo dos hebras
    }
  },
  {
    id: '3',
    name: 'Falda Midi',
    description: 'Falda elegante con diseño único',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1603321581635-d46915755425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc2tpcnQlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTYwNjM3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Faldas',
    yarnRequirements: {
      normal: 1,      // Requiere poco hilo normal
      doubleStrand: 3 // Principalmente usa hilo dos hebras
    },
    availableColors: {
      normal: ['Negro', 'Blanco', 'Beige'],
      doubleStrand: ['Rosa', 'Azul', 'Verde', 'Morado', 'Gris', 'Café']
    }
  },
  {
    id: '4',
    name: 'Top Cropped',
    description: 'Top moderno para looks casuales',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1753874383739-8750d6db6773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwdG9wJTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU2MDYzNzQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Tops',
    yarnRequirements: {
      normal: 2,
      doubleStrand: 1
    },
    availableColors: {
      normal: ['Rosa', 'Azul', 'Verde', 'Blanco', 'Amarillo'],
      doubleStrand: ['Negro', 'Gris', 'Café', 'Beige']
    }
  }
];

export default function App() {
  /**
   * ESTADOS PRINCIPALES DE LA APLICACIÓN
   * React hooks para manejar el estado de la aplicación
   */
  
  // Producto seleccionado para personalizar (null = no hay producto seleccionado)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Estado del carrito (abierto/cerrado)
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Array con todos los productos en el carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /**
   * FUNCIONES DE MANEJO DE EVENTOS
   * Estas funciones se ejecutan cuando el usuario interactúa con la aplicación
   */
  
  // Se ejecuta cuando el usuario quiere personalizar un producto
  const handleCustomizeProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  // Se ejecuta cuando el usuario agrega un producto personalizado al carrito
  const handleAddToCart = (product: Product, customization: any) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`, // ID único basado en el producto y timestamp
      product,
      customization,
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
  };

  // Se ejecuta cuando el usuario cambia la cantidad de un producto en el carrito
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menor, removemos el producto
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      // Si no, actualizamos la cantidad
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  // Se ejecuta cuando el usuario quiere remover completamente un producto del carrito
  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Calcula el total de productos en el carrito (para mostrar en el header)
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER - Navegación principal */}
      <Header 
        cartItems={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* SECCIÓN NOSOTROS - Información sobre el emprendimiento Akima */}
      <section id="inicio" className="bg-gradient-to-br from-akima-light-pink to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Logo grande para la sección principal */}
            <div className="flex justify-center mb-8">
              <img 
                src="/akima-logo.png"
                alt="Akima Logo"
                className="h-20 w-auto"
                onError={(e) => {
                  // Fallback: mostrar texto si no encuentra la imagen
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Título principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-akima-brown mb-6 tracking-tight">
              Akima
            </h1>
            
            {/* Descripción del emprendimiento */}
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Somos un emprendimiento juvenil especializado en crear ropa única a crochet. 
              Cada prenda es tejida a mano con amor y dedicación, ofreciendo diseños modernos 
              y la posibilidad de personalizar cada pieza con los colores que más te representen.
            </p>
          </div>

          {/* Tarjetas con información sobre Akima */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Tarjeta 1: Personalización */}
            <Card className="bg-white/80 backdrop-blur-sm border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown mb-2">100% Personalizable</h3>
                <p className="text-muted-foreground text-sm">
                  Elige los colores de hilo que más te gusten para crear una prenda única que refleje tu personalidad.
                </p>
              </CardContent>
            </Card>

            {/* Tarjeta 2: Hecho a mano */}
            <Card className="bg-white/80 backdrop-blur-sm border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown mb-2">Hecho con Amor</h3>
                <p className="text-muted-foreground text-sm">
                  Cada prenda es tejida cuidadosamente a mano, garantizando calidad y un toque artesanal único.
                </p>
              </CardContent>
            </Card>

            {/* Tarjeta 3: Emprendimiento juvenil */}
            <Card className="bg-white/80 backdrop-blur-sm border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full mb-4">
                  <Users className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown mb-2">Emprendimiento Juvenil</h3>
                <p className="text-muted-foreground text-sm">
                  Somos jóvenes emprendedoras que combinamos creatividad y pasión por el crochet para crear moda única.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Llamada a la acción */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-akima-pink hover:bg-akima-pink/90 text-white"
              onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Descubre nuestros productos
            </Button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS */}
      <section id="productos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-akima-brown mb-4">Nuestros Productos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada prenda es única y hecha con amor. Personaliza los colores según tu estilo y crea algo completamente tuyo.
            </p>
          </div>
          
          {/* Grid de productos - se adapta según el tamaño de pantalla */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={handleCustomizeProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS - Información detallada del emprendimiento */}
      <section id="nosotros" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-akima-brown mb-6">
                Nuestra Historia
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Akima nació de la pasión por el crochet y el deseo de crear ropa única para jóvenes. 
                Comenzamos como un pequeño proyecto personal y hemos crecido hasta convertirnos en 
                un emprendimiento que valora la creatividad, la calidad y la personalización.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nuestro sistema de personalización te permite elegir entre diferentes tipos de hilo 
                y una amplia gama de colores para crear prendas que realmente reflejen tu estilo personal.
              </p>
              
              {/* Lista de características únicas */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-akima-pink rounded-full mt-2"></div>
                  <span>Colores de hilo normal para la base de la prenda</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-akima-pink rounded-full mt-2"></div>
                  <span>Colores de hilo dos hebras para detalles y acabados especiales</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-akima-pink rounded-full mt-2"></div>
                  <span>Combinaciones únicas según tu gusto personal</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-akima-pink rounded-full mt-2"></div>
                  <span>Tejido artesanal que garantiza durabilidad y comodidad</span>
                </li>
              </ul>
              
              <Button className="bg-akima-brown hover:bg-akima-dark-brown text-white">
                Conoce más sobre nosotros
              </Button>
            </div>
            
            {/* Panel de colores disponibles */}
            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-akima-pink" />
                  <h3 className="font-bold text-akima-brown">Paleta de Colores Disponibles</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Sección hilo normal */}
                  <div>
                    <p className="text-sm font-medium mb-3 text-akima-brown">Hilo normal:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Rosa', 'Azul', 'Verde', 'Amarillo', 'Morado', 'Blanco', 'Negro', 'Gris'].map((color) => (
                        <div key={color} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                          <div 
                            className="w-5 h-5 rounded-full border border-border shadow-sm"
                            style={{ 
                              backgroundColor: {
                                'Rosa': '#FFB6C1',
                                'Azul': '#87CEEB',
                                'Verde': '#98FB98',
                                'Amarillo': '#FFFFE0',
                                'Morado': '#DDA0DD',
                                'Blanco': '#FFFFFF',
                                'Negro': '#2F2F2F',
                                'Gris': '#D3D3D3'
                              }[color] || '#ccc'
                            }}
                          />
                          <span className="text-xs font-medium">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sección hilo dos hebras */}
                  <div>
                    <p className="text-sm font-medium mb-3 text-akima-brown">Hilo dos hebras:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Beige', 'Café', 'Rojo', 'Naranja'].map((color) => (
                        <div key={color} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                          <div 
                            className="w-5 h-5 rounded-full border-2 border-border shadow-sm"
                            style={{ 
                              backgroundColor: {
                                'Beige': '#F5F5DC',
                                'Café': '#D2B48C',
                                'Rojo': '#FFB6C1',
                                'Naranja': '#FFD700'
                              }[color] || '#ccc'
                            }}
                          />
                          <span className="text-xs font-medium">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-akima-light-pink rounded-lg">
                  <p className="text-xs text-akima-brown">
                    💡 <strong>Tip:</strong> Los hilos normales se usan para la estructura principal, 
                    mientras que los de dos hebras añaden textura y detalles especiales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO */}
      <section id="contacto" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-akima-brown mb-4">Contáctanos</h2>
            <p className="text-muted-foreground">
              ¿Tienes alguna pregunta o quieres hacer un pedido personalizado? ¡Nos encantaría escucharte!
            </p>
          </div>
          
          {/* Grid de opciones de contacto */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Instagram */}
            <Card className="text-center p-6 border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full">
                  <Instagram className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown">Instagram</h3>
                <p className="text-muted-foreground">@akima_crochet</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-akima-pink text-akima-pink hover:bg-akima-light-pink"
                >
                  Síguenos
                </Button>
              </CardContent>
            </Card>
            
            {/* WhatsApp */}
            <Card className="text-center p-6 border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full">
                  <MessageCircle className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown">WhatsApp</h3>
                <p className="text-muted-foreground">+57 300 123 4567</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-akima-pink text-akima-pink hover:bg-akima-light-pink"
                >
                  Chatear
                </Button>
              </CardContent>
            </Card>
            
            {/* Facebook */}
            <Card className="text-center p-6 border-akima-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-akima-pink/20 rounded-full">
                  <Facebook className="h-6 w-6 text-akima-pink" />
                </div>
                <h3 className="font-bold text-akima-brown">Facebook</h3>
                <p className="text-muted-foreground">Akima Crochet</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-akima-pink text-akima-pink hover:bg-akima-light-pink"
                >
                  Visitar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-akima-brown text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/akima-logo.png"
                alt="Akima Logo"
                className="h-8 w-auto opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Akima</h3>
            <p className="mb-4 text-white/80">Ropa juvenil única hecha con amor</p>
            <p className="text-sm text-white/60">
              © 2024 Akima. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* MODALES */}
      
      {/* Modal de personalización de productos */}
      <ProductCustomizer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Modal del carrito de compras */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}