/**
 * COMPONENTE PERSONALIZADOR DE PRODUCTOS - AKIMA
 * 
 * Este componente permite a los usuarios seleccionar los colores específicos de hilo
 * para personalizar sus productos según los requerimientos de cada prenda.
 * 
 * Funcionalidades:
 * - Selección de colores de hilo normal
 * - Selección de colores de hilo dos hebras
 * - Validación de selecciones requeridas
 * - Preview de la selección actual
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X, Check } from 'lucide-react';
import { Product } from './ProductCard';

// Interfaz para las opciones de personalización
interface CustomizationOptions {
  normalYarnColors: string[];      // Colores seleccionados de hilo normal
  doubleStrandColors: string[];    // Colores seleccionados de hilo dos hebras
}

// Props del componente
interface ProductCustomizerProps {
  product: Product | null;         // Producto a personalizar (null si no hay ninguno)
  onClose: () => void;            // Función para cerrar el modal
  onAddToCart: (product: Product, customization: CustomizationOptions) => void; // Función para agregar al carrito
}

export function ProductCustomizer({ product, onClose, onAddToCart }: ProductCustomizerProps) {
  /**
   * ESTADOS DEL COMPONENTE
   * Manejan la selección actual de colores del usuario
   */
  const [selectedNormalColors, setSelectedNormalColors] = useState<string[]>([]);
  const [selectedDoubleStrandColors, setSelectedDoubleStrandColors] = useState<string[]>([]);

  /**
   * PALETA DE COLORES - ACTUALIZADA CON COLORES DE AKIMA
   * Misma paleta que en ProductCard para consistencia visual
   */
  const colorPalette = {
    'Rosa': '#E1A4D1',    // Rosa principal de Akima
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
    'Café': '#5D3A2E'     // Café principal de Akima
  };

  // Si no hay producto seleccionado, no renderizar nada
  if (!product) return null;

  /**
   * MANEJO DE SELECCIÓN DE COLORES DE HILO NORMAL
   * Permite seleccionar/deseleccionar colores hasta el límite requerido
   */
  const handleNormalColorSelect = (color: string) => {
    if (selectedNormalColors.includes(color)) {
      // Si ya está seleccionado, lo removemos
      setSelectedNormalColors(selectedNormalColors.filter(c => c !== color));
    } else if (selectedNormalColors.length < product.yarnRequirements.normal) {
      // Si no está seleccionado y no hemos alcanzado el límite, lo agregamos
      setSelectedNormalColors([...selectedNormalColors, color]);
    }
  };

  /**
   * MANEJO DE SELECCIÓN DE COLORES DE HILO DOS HEBRAS
   * Similar al anterior pero para hilo de dos hebras
   */
  const handleDoubleStrandColorSelect = (color: string) => {
    if (selectedDoubleStrandColors.includes(color)) {
      setSelectedDoubleStrandColors(selectedDoubleStrandColors.filter(c => c !== color));
    } else if (selectedDoubleStrandColors.length < product.yarnRequirements.doubleStrand) {
      setSelectedDoubleStrandColors([...selectedDoubleStrandColors, color]);
    }
  };

  /**
   * FUNCIÓN PARA AGREGAR AL CARRITO
   * Solo se ejecuta si se han seleccionado todos los colores requeridos
   */
  const handleAddToCart = () => {
    if (selectedNormalColors.length === product.yarnRequirements.normal &&
        selectedDoubleStrandColors.length === product.yarnRequirements.doubleStrand) {
      onAddToCart(product, {
        normalYarnColors: selectedNormalColors,
        doubleStrandColors: selectedDoubleStrandColors
      });
      // Resetear selecciones después de agregar al carrito
      setSelectedNormalColors([]);
      setSelectedDoubleStrandColors([]);
      onClose();
    }
  };

  /**
   * VALIDACIÓN DE COMPLETITUD
   * Verifica si se han seleccionado todos los colores requeridos
   */
  const isComplete = selectedNormalColors.length === product.yarnRequirements.normal &&
                     selectedDoubleStrandColors.length === product.yarnRequirements.doubleStrand;

  return (
    // Overlay del modal con fondo semi-transparente
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Card principal del modal */}
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-akima-pink/30">
        
        {/* HEADER DEL MODAL */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-akima-pink/20">
          <CardTitle className="text-akima-brown">
            Personalizar {product.name}
          </CardTitle>
          {/* Botón para cerrar el modal */}
          <Button variant="ghost" size="sm" onClick={onClose} className="text-akima-brown hover:bg-akima-light-pink">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        {/* CONTENIDO PRINCIPAL DEL MODAL */}
        <CardContent className="space-y-6 p-6">
          
          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-akima-pink/20">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-akima-brown">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <Badge variant="secondary" className="bg-akima-light-pink text-akima-brown">
                {product.category}
              </Badge>
              <p className="text-2xl font-bold text-akima-pink">
                ${product.price.toLocaleString()}
              </p>
              
              {/* Resumen de requerimientos */}
              <div className="bg-akima-light-pink/50 p-3 rounded-lg space-y-1">
                <p className="text-sm font-medium text-akima-brown">Requerimientos:</p>
                <p className="text-sm text-akima-brown">• {product.yarnRequirements.normal} madejas de hilo normal</p>
                <p className="text-sm text-akima-brown">• {product.yarnRequirements.doubleStrand} madejas de hilo dos hebras</p>
              </div>
            </div>
          </div>

          {/* SELECCIÓN DE COLORES DE HILO NORMAL */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium text-akima-brown">
                Selecciona colores de hilo normal
              </Label>
              {/* Contador de progreso */}
              <Badge 
                variant="outline" 
                className={`
                  ${selectedNormalColors.length === product.yarnRequirements.normal 
                    ? 'border-green-500 text-green-600' 
                    : 'border-akima-pink text-akima-pink'
                  }
                `}
              >
                {selectedNormalColors.length}/{product.yarnRequirements.normal}
                {selectedNormalColors.length === product.yarnRequirements.normal && (
                  <Check className="h-3 w-3 ml-1" />
                )}
              </Badge>
            </div>
            
            {/* Grid de colores seleccionables */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
              {product.availableColors.normal.map((color) => {
                const isSelected = selectedNormalColors.includes(color);
                const canSelect = selectedNormalColors.length < product.yarnRequirements.normal;
                
                return (
                  <button
                    key={color}
                    onClick={() => handleNormalColorSelect(color)}
                    disabled={!isSelected && !canSelect}
                    className={`
                      relative w-12 h-12 rounded-lg border-3 transition-all duration-200 group
                      ${isSelected 
                        ? 'border-akima-pink scale-105 shadow-lg ring-2 ring-akima-pink/30' 
                        : canSelect 
                          ? 'border-gray-300 hover:border-akima-pink/50 hover:scale-105 hover:shadow-md' 
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }
                    `}
                    style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                    title={color}
                  >
                    {/* Indicador de selección */}
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 bg-akima-pink rounded-full flex items-center justify-center shadow-lg">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}
                    {/* Tooltip con nombre del color */}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      {color}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Badges de colores seleccionados */}
            <div className="flex flex-wrap gap-2">
              {selectedNormalColors.map((color, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-akima-pink/20 text-akima-brown border-akima-pink/30"
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          {/* SELECCIÓN DE COLORES DE HILO DOS HEBRAS - Solo si es necesario */}
          {product.yarnRequirements.doubleStrand > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium text-akima-brown">
                  Selecciona colores de hilo dos hebras
                </Label>
                <Badge 
                  variant="outline" 
                  className={`
                    ${selectedDoubleStrandColors.length === product.yarnRequirements.doubleStrand 
                      ? 'border-green-500 text-green-600' 
                      : 'border-akima-pink text-akima-pink'
                    }
                  `}
                >
                  {selectedDoubleStrandColors.length}/{product.yarnRequirements.doubleStrand}
                  {selectedDoubleStrandColors.length === product.yarnRequirements.doubleStrand && (
                    <Check className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              </div>
              
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                {product.availableColors.doubleStrand.map((color) => {
                  const isSelected = selectedDoubleStrandColors.includes(color);
                  const canSelect = selectedDoubleStrandColors.length < product.yarnRequirements.doubleStrand;
                  
                  return (
                    <button
                      key={color}
                      onClick={() => handleDoubleStrandColorSelect(color)}
                      disabled={!isSelected && !canSelect}
                      className={`
                        relative w-12 h-12 rounded-lg border-4 transition-all duration-200 group
                        ${isSelected 
                          ? 'border-akima-pink scale-105 shadow-lg ring-2 ring-akima-pink/30' 
                          : canSelect 
                            ? 'border-gray-300 hover:border-akima-pink/50 hover:scale-105 hover:shadow-md' 
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }
                      `}
                      style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                      title={color}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 bg-akima-pink rounded-full flex items-center justify-center shadow-lg">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {color}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedDoubleStrandColors.map((color, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-akima-pink/20 text-akima-brown border-akima-pink/30"
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-3 pt-6 border-t border-akima-pink/20">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-akima-pink text-akima-brown hover:bg-akima-light-pink"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              disabled={!isComplete}
              className={`
                flex-1 
                ${isComplete 
                  ? 'bg-akima-pink hover:bg-akima-pink/90 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isComplete ? 'Agregar al carrito' : 'Selecciona todos los colores'}
            </Button>
          </div>
          
          {/* Mensaje de ayuda */}
          <div className="bg-akima-light-pink/30 p-4 rounded-lg">
            <p className="text-sm text-akima-brown">
              💡 <strong>Consejo:</strong> Los hilos normales forman la estructura principal de la prenda, 
              mientras que los de dos hebras se usan para detalles y acabados especiales que destacan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}