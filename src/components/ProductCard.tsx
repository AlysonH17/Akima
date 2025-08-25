/**
 * COMPONENTE TARJETA DE PRODUCTO - AKIMA
 * 
 * Este componente muestra cada producto individual en el catálogo.
 * Incluye imagen, información del producto, colores disponibles y botón de personalización.
 * 
 * Props:
 * - product: objeto con toda la información del producto
 * - onCustomize: función que se ejecuta cuando el usuario quiere personalizar el producto
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Tipos de datos para el hilo y productos
export interface YarnType {
  id: string;
  name: string;
  colors: string[];
}

// Interfaz que define la estructura de un producto
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  yarnRequirements: {
    normal: number;      // Cantidad de madejas de hilo normal requeridas
    doubleStrand: number; // Cantidad de madejas de hilo dos hebras requeridas
  };
  availableColors: {
    normal: string[];      // Colores disponibles de hilo normal
    doubleStrand: string[]; // Colores disponibles de hilo dos hebras
  };
}

// Props que recibe el componente
interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
}

export function ProductCard({ product, onCustomize }: ProductCardProps) {
  /**
   * PALETA DE COLORES
   * Define los colores hexadecimales para cada nombre de color.
   * Puedes agregar o modificar colores aquí según tu inventario.
   */
  const colorPalette = {
    'Rosa': '#E1A4D1',    // Rosa de Akima
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
    'Café': '#5D3A2E'     // Café de Akima
  };

  return (
    // Tarjeta principal con efectos hover
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-akima-pink/20">
      {/* HEADER DE LA TARJETA - Imagen del producto */}
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          {/* Imagen del producto con efecto zoom al hover */}
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge con la categoría del producto */}
          <Badge className="absolute top-2 right-2 bg-akima-pink text-white">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      {/* CONTENIDO PRINCIPAL DE LA TARJETA */}
      <CardContent className="p-4">
        {/* Título del producto */}
        <CardTitle className="mb-2 text-akima-brown">{product.name}</CardTitle>
        {/* Descripción del producto */}
        <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
        
        {/* INFORMACIÓN DE REQUERIMIENTOS DE HILO */}
        <div className="space-y-2 mb-4 bg-akima-light-pink/30 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-akima-brown">Hilo normal:</span>
            <span className="text-akima-brown">{product.yarnRequirements.normal} madejas</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-akima-brown">Hilo dos hebras:</span>
            <span className="text-akima-brown">{product.yarnRequirements.doubleStrand} madejas</span>
          </div>
        </div>

        {/* PREVIEW DE COLORES DISPONIBLES */}
        <div className="space-y-3">
          {/* Colores de hilo normal */}
          <div>
            <p className="text-sm mb-2 font-medium text-akima-brown">Colores - Hilo normal:</p>
            <div className="flex flex-wrap gap-1">
              {/* Muestra los primeros 4 colores */}
              {product.availableColors.normal.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-akima-pink/20"
                  style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                  title={color} // Tooltip con el nombre del color
                />
              ))}
              {/* Si hay más de 4 colores, muestra un indicador */}
              {product.availableColors.normal.length > 4 && (
                <span className="text-xs text-muted-foreground self-center ml-1">
                  +{product.availableColors.normal.length - 4} más
                </span>
              )}
            </div>
          </div>
          
          {/* Colores de hilo dos hebras - solo se muestra si el producto los requiere */}
          {product.yarnRequirements.doubleStrand > 0 && (
            <div>
              <p className="text-sm mb-2 font-medium text-akima-brown">Colores - Dos hebras:</p>
              <div className="flex flex-wrap gap-1">
                {product.availableColors.doubleStrand.slice(0, 4).map((color) => (
                  <div
                    key={color}
                    className="w-5 h-5 rounded-full border-4 border-white shadow-sm ring-1 ring-akima-pink/20"
                    style={{ backgroundColor: colorPalette[color as keyof typeof colorPalette] || '#ccc' }}
                    title={color}
                  />
                ))}
                {product.availableColors.doubleStrand.length > 4 && (
                  <span className="text-xs text-muted-foreground self-center ml-1">
                    +{product.availableColors.doubleStrand.length - 4} más
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* FOOTER DE LA TARJETA - Precio y botón */}
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          {/* Precio del producto formateado */}
          <span className="text-2xl font-bold text-akima-pink">
            ${product.price.toLocaleString()}
          </span>
        </div>
        {/* Botón para personalizar el producto */}
        <Button 
          onClick={() => onCustomize(product)}
          className="bg-akima-brown hover:bg-akima-dark-brown text-white"
        >
          Personalizar
        </Button>
      </CardFooter>
    </Card>
  );
}