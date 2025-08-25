/**
 * COMPONENTE HEADER - NAVEGACIÓN PRINCIPAL DE AKIMA
 * 
 * Este componente maneja toda la navegación superior de la página web.
 * Incluye el logo, menú de navegación, carrito de compras y versión móvil.
 * 
 * Props:
 * - cartItems: número de artículos en el carrito (para mostrar el badge)
 * - onCartClick: función que se ejecuta cuando se hace clic en el carrito
 */

import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';

// Definimos las props que recibe el componente
interface HeaderProps {
  cartItems: number; // Cantidad de productos en el carrito
  onCartClick: () => void; // Función para abrir el carrito
}

export function Header({ cartItems, onCartClick }: HeaderProps) {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array con los elementos de navegación - puedes agregar o quitar elementos aquí
  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Nosotros', href: '#nosotros' }, // Cambiado de 'Personalizar' a 'Nosotros'
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    // Header sticky que se queda fijo arriba cuando haces scroll
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      {/* Container principal con máximo ancho y padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* SECCIÓN DEL LOGO */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* Logo de Akima - usando imagen local */}
            <img 
              src="/akima-logo.png"
              alt="Akima Logo"
              className="h-8 w-auto" // Ajusta el tamaño del logo según necesites
              onError={(e) => {
                // Fallback si no encuentra la imagen
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              {/* Nombre de la marca - puedes cambiar el estilo aquí */}
              <h1 className="text-2xl font-bold text-akima-brown tracking-tight">Akima</h1>
              {/* Subtítulo descriptivo */}
              <p className="text-sm text-muted-foreground">Ropa juvenil hecha a crochet</p>
            </div>
          </div>

          {/* NAVEGACIÓN DESKTOP - solo visible en pantallas medianas y grandes */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-akima-pink transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* SECCIÓN DERECHA - Carrito y menú móvil */}
          <div className="flex items-center space-x-4">
            {/* Botón del carrito */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative border-akima-pink text-akima-brown hover:bg-akima-light-pink"
            >
              <ShoppingBag className="h-4 w-4" />
              {/* Badge con el número de productos - solo se muestra si hay productos */}
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-akima-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            {/* Botón del menú móvil - solo visible en pantallas pequeñas */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-akima-brown hover:bg-akima-light-pink"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* Cambia entre icono de menú y X según el estado */}
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* MENÚ MÓVIL - solo se muestra cuando isMenuOpen es true */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-akima-pink hover:bg-akima-light-pink rounded-md transition-colors duration-200"
                  // Cierra el menú móvil cuando se hace clic en un enlace
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}