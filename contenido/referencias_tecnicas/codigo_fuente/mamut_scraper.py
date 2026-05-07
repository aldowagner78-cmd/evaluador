#!/usr/bin/env python3
"""
Scraper para mamutmatematicas.com - Ejercicios 6to grado
Descarga:
  1. PDFs de muestra (gratuitos)
  2. Hojas de ejercicios renderizadas como PDF via Chrome headless
"""

import os
import subprocess
import time
import urllib.request
import urllib.parse
from pathlib import Path

BASE_URL = "https://www.mamutmatematicas.com"
OUTPUT_DIR = Path("/home/usuario/Escritorio/Scrapping/mamut_6to")

MUESTRA_DIR = OUTPUT_DIR / "muestras_pdf"
EJERCICIOS_DIR = OUTPUT_DIR / "ejercicios_pdf"

MUESTRA_DIR.mkdir(parents=True, exist_ok=True)
EJERCICIOS_DIR.mkdir(parents=True, exist_ok=True)

# ── PDFs de muestra disponibles en la página ─────────────────────────────────
PDFS_MUESTRA = [
    # Decimales 2
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Indice.pdf",
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Repaso_decimos_centesimos.pdf",
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Comparar_decimales.pdf",
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Multiplicar_decimales.pdf",
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Multiplicar_decimales_por_decimales.pdf",
    "https://www.mamutmatematicas.com/muestras/Decimales_2_Dividir_decimales_por_decimales.pdf",
    # Fracciones y decimales 3
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Indice.pdf",
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Sumar_restar_decimales.pdf",
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Dividir_decimales_por_decimales1.pdf",
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Escalar_en_mapas.pdf",
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Repaso_simplificar_fracciones.pdf",
    "https://www.mamutmatematicas.com/muestras/Fracciones_decimales_3_Simplificar_antes_de_multiplicar.pdf",
    # Razones, proporciones
    "https://www.mamutmatematicas.com/muestras/Razones_proporciones_problemas_Indice.pdf",
    "https://www.mamutmatematicas.com/muestras/Razones_proporciones_problemas_resolver_problemas_razones_equivalentes.pdf",
    "https://www.mamutmatematicas.com/muestras/Razones_proporciones_problemas_resolver_problemas.pdf",
    "https://www.mamutmatematicas.com/muestras/Razones_proporciones_problemas_escalar_figuras2.pdf",
    "https://www.mamutmatematicas.com/muestras/Razones_proporciones_problemas_con_razones.pdf",
    # Porcentaje
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Indice.pdf",
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Que_porcentaje.pdf",
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Porcentaje_de_un_numero.pdf",
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Rebajas.pdf",
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Porcentaje_de_cambio.pdf",
    "https://www.mamutmatematicas.com/muestras/Porcentaje_Repaso.pdf",
    # Números enteros
    "https://www.mamutmatematicas.com/muestras/Numeros_enteros_Indice.pdf",
    "https://www.mamutmatematicas.com/muestras/Numeros_enteros_Sumar_numeros_enteros1_fichas.pdf",
    "https://www.mamutmatematicas.com/muestras/Numeros_enteros_Dividir_numeros_enteros.pdf",
    "https://www.mamutmatematicas.com/muestras/Numeros_enteros_Practica_cuadricula_coordenadas.pdf",
]

# ── Hojas de ejercicios (generadas dinámicamente) ────────────────────────────
EJERCICIOS = {
    # Multiplicación
    "mul_4x2": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=1&col=2&row=3&min1=1001&max1=9999&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=6&exd=1&font=Default&FontSize=14pt&pad=30&border=on&ptitle=&Submit=Submit",
    "mul_5x2": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=1&col=2&row=3&min1=10001&max1=99999&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=6&exd=1&font=Default&FontSize=14pt&pad=30&border=on&ptitle=&Submit=Submit",
    "mul_3x3": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=1&col=2&row=3&min1=101&max1=999&step1=1&list1=&min2=101&max2=999&step2=1&list2=&M=2&D=2&xdiv=6&exd=1&font=Default&FontSize=14pt&pad=30&border=on&ptitle=&Submit=Submit",
    "mul_4x3": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=1&col=2&row=3&min1=1001&max1=9999&step1=1&list1=&min2=101&max2=999&step2=1&list2=&M=2&D=2&xdiv=6&exd=1&font=Default&FontSize=14pt&pad=30&border=on&ptitle=&Submit=Submit",
    "mul_4x4": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=1&col=2&row=2&min1=1001&max1=9999&step1=1&list1=&min2=1001&max2=9999&step2=1&list2=&M=2&D=2&xdiv=11&exd=1&font=Default&FontSize=14pt&pad=40&border=on&ptitle=&Submit=Submit",
    # División
    "div_5x1_sinresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=1000&max1=100000&step1=1&list1=&min2=2&max2=9&step2=1&list2=&M=2&D=2&xdiv=9&exd=1&neg=1&font=Default&FontSize=12pt&pad=25&border=on&ptitle=&Submit=Submit",
    "div_5x1_conresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=1000&max1=100000&step1=1&list1=&min2=2&max2=9&step2=1&list2=&M=2&D=2&xdiv=9&neg=1&font=Default&FontSize=12pt&pad=25&border=on&ptitle=&Submit=Submit",
    "div_6x1_sinresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=10000&max1=1000000&step1=1&list1=&min2=2&max2=9&step2=1&list2=&M=2&D=2&xdiv=10&exd=1&neg=1&font=Default&FontSize=12pt&pad=18&border=on&ptitle=&Submit=Submit",
    "div_6x1_conresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=10000&max1=1000000&step1=1&list1=&min2=2&max2=9&step2=1&list2=&M=2&D=2&xdiv=10&neg=1&font=Default&FontSize=12pt&pad=18&border=on&ptitle=&Submit=Submit",
    "div_5x2_sinresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=1000&max1=100000&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=10&exd=1&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    "div_5x2_conresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=21&max1=100000&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=10&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    "div_6x2_sinresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=100000&max1=1000000&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=10&exd=1&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    "div_6x2_conresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=100000&max1=1000000&step1=1&list1=&min2=11&max2=99&step2=1&list2=&M=2&D=2&xdiv=10&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    "div_6x3_sinresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=100000&max1=1000000&step1=1&list1=&min2=101&max2=999&step2=1&list2=&M=2&D=2&xdiv=10&exd=1&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    "div_6x3_conresto": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=1&col=2&row=3&min1=100000&max1=1000000&step1=1&list1=&min2=101&max2=999&step2=1&list2=&M=2&D=2&xdiv=10&neg=1&font=Default&FontSize=12pt&pad=15&border=on&ptitle=&Submit=Submit",
    # Decimales - multiplicación
    "dec_mul_entero_x_decimal": "https://www.mamutmatematicas.com/ejercicios/tabla-decimales.php?op=*&long=0&col=2&row=4&min1=0&max1=9&list1=&mindec1=1&dec1=3&min2=2&max2=99&list2=&mindec2=0&dec2=0&addends=2&subtrahends=2&term=1&term_digits=2&round_decimals=3&neg=1&decimalseparator=1&M=2&D=2&xdiv=8&font=Default&FontSize=12pt&pad=8&border=on&ptitle=&Submit=Submit",
    "dec_mul_decimal_x_decimal_2dig": "https://www.mamutmatematicas.com/ejercicios/tabla-decimales.php?op=*&long=0&col=2&row=3&min1=0&max1=9&list1=&mindec1=1&dec1=2&min2=0&max2=9&list2=&mindec2=1&dec2=2&addends=2&subtrahends=2&term=1&term_digits=2&round_decimals=3&neg=1&decimalseparator=1&M=2&D=2&xdiv=11&font=Default&FontSize=12pt&pad=12&border=on&ptitle=&Submit=Submit",
    # Decimales - suma y resta
    "dec_suma_resta_mental": "https://www.mamutmatematicas.com/ejercicios/tabla-decimales.php?op=addsub&long=0&col=2&row=10&min1=0&max1=5&list1=&mindec1=0&dec1=1&min2=0&max2=3&list2=&mindec2=1&dec2=2&addends=2&subtrahends=1&term=1&term_digits=2&round_decimals=3&switch_v1v2=1&neg=1&decimalseparator=1&M=2&D=2&xdiv=2&font=Default&FontSize=12pt&pad=8&ptitle=&Submit=Submit",
    "dec_suma_resta_col_1a3dig": "https://www.mamutmatematicas.com/ejercicios/tabla-decimales.php?op=addsub&long=0&col=2&row=4&min1=0&max1=5&list1=&mindec1=1&dec1=3&min2=0&max2=3&list2=&mindec2=1&dec2=3&addends=2&subtrahends=2&term=1&term_digits=2&round_decimals=3&neg=1&decimalseparator=1&M=2&D=2&xdiv=8&font=Default&FontSize=12pt&pad=8&border=on&ptitle=&Submit=Submit",
    # Exponentes
    "exponentes_facil": "https://www.mamutmatematicas.com/ejercicios/tabla-exponentes.php?col=2&row=8&level=1&type1=1&multsymbol=1&font=Default&FontSize=14pt&pad=15&ptitle=&Submit=Submit",
    "exponentes_desafio": "https://www.mamutmatematicas.com/ejercicios/tabla-exponentes.php?col=2&row=8&level=2&type1=1&multsymbol=1&font=Default&FontSize=14pt&pad=15&ptitle=&Submit=Submit",
    "exponentes_escribir": "https://www.mamutmatematicas.com/ejercicios/tabla-exponentes.php?col=1&row=10&level=2&type1=2&multsymbol=1&font=Default&FontSize=14pt&pad=12&ptitle=&Submit=Submit",
    # Valor posicional
    "vp_forma_expandida_9dig": "https://www.mamutmatematicas.com/ejercicios/tabla-valor_posicional_notacion_cientifica.php?col=1&row=8&level=1&type=1&exponents=1&digits=9&decimaldigits=0&multsymbol=1&decimalseparator=1&thousandseparator=1&font=Default&FontSize=14pt&pad=15&ptitle=&Submit=Submit",
    "vp_redondeo_misto_1": "https://www.mamutmatematicas.com/ejercicios/tabla-redondear.php?R2=&R=-4&R3=&instr=2&col=2&row=8&min1=100&max1=1000000&font=Default&FontSize=14pt&pad=25&ptitle=&Submit=Submit",
    # Álgebra - orden de operaciones
    "alg_orden_3op": "https://www.mamutmatematicas.com/ejercicios/tabla-orden-operaciones.php?operadd=on&opersub=on&opermul=on&operdiv=on&operations=3&parenthesis=on&minadd=1&maxadd=30&minmul=1&maxmul=12&mindiv=1&maxdiv=144&minbase=1&maxbase=5&minexp=1&maxexp=3&decimaldigits=0&col=2&row=5&workspace=5&font=Default&FontSize=12pt&pad=8&border=on&ptitle=&Submit=Submit",
    "alg_orden_4op": "https://www.mamutmatematicas.com/ejercicios/tabla-orden-operaciones.php?operadd=on&opersub=on&opermul=on&operdiv=on&operations=4&parenthesis=on&minadd=1&maxadd=30&minmul=1&maxmul=12&mindiv=1&maxdiv=144&minbase=1&maxbase=5&minexp=1&maxexp=3&decimaldigits=0&col=2&row=4&workspace=7&font=Default&FontSize=12pt&pad=8&border=on&ptitle=&Submit=Submit",
    "alg_orden_2o3op_fraccion": "https://www.mamutmatematicas.com/ejercicios/tabla-orden-operaciones2.php?twoop=1&threeop=1&nonnegative=on&min=1&max=10&minbase=1&maxbase=5&minexp=2&maxexp=3&decimals=0&round=3&col=2&row=5&workspace=3&font=Default&FontSize=14pt&pad=10&border=on&ptitle=&Submit=Submit",
    "alg_orden_con_exponentes": "https://www.mamutmatematicas.com/ejercicios/tabla-orden-operaciones2.php?twoop=1&threeop=1&exponents=on&nonnegative=on&min=-10&max=10&minbase=1&maxbase=5&minexp=2&maxexp=3&decimals=0&round=3&col=2&row=5&workspace=3&font=Default&FontSize=14pt&pad=15&border=on&ptitle=&Submit=Submit",
    # Álgebra - expresiones y ecuaciones
    "alg_evaluar_expr_1op": "https://www.mamutmatematicas.com/ejercicios/tabla_evaluar_expresiones.php?col=2&row=5&level1=1&min1=1&max1=10&min2=1&max2=10&minc1=2&maxc1=10&minc2=2&maxc2=10&decimals=0&workspace=5&font=Arial&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "alg_ecuaciones_1paso": "https://www.mamutmatematicas.com/ejercicios/tabla-ecuaciones-lineales.php?col=2&row=6&coeffmin=2&coeffmax=12&constmin=1&constmax=12&decimals=0&workspace=3&type1=1&nonnegative=1&type2=1&nonnegative=1&type3=1&nonnegative=1&font=Default&FontSize=12pt&pad=8&border=on&ptitle=&Submit=Submit",
    # Fracciones vs. decimales
    "frac_dec_fraccion_a_decimal_divlarga": "https://www.mamutmatematicas.com/ejercicios/tabla-fraccion-decimal.php?op=1&col=2&row=3&workspace=10&morethan1=1&dec=3&easy=0&powten=0&max=1000&any=100&minden=3&maxden=30&list=&exp=3&font=Default&FontSize=12pt&pad=7&border=on&ptitle=Round+the+answers+to+three+decimal+digits.&Submit=Submit",
    "frac_dec_practica_mixta": "https://www.mamutmatematicas.com/ejercicios/tabla-fraccion-decimal.php?op=1&col=2&row=9&workspace=1&morethan1=0&mixed=1&dec=7&easy=40&powten=40&max=100000&any=20&minden=3&maxden=30&exp=4&font=Default&FontSize=12pt&pad=5&ptitle=&Submit=Submit",
    # Razones
    "razones_escribir_simplificar": "https://www.mamutmatematicas.com/ejercicios/tabla-razones.php?col=1&row=6&level2=1&min=1&max=30&step=1&font=Default&FontSize=12pt&pad=8&workspace=2&ptitle=&Submit=Submit",
    "razones_problemas_verbales": "https://www.mamutmatematicas.com/ejercicios/tabla-razones.php?col=1&row=5&min=1&max=30&step=1&level3=1&font=Default&FontSize=12pt&pad=8&workspace=3&ptitle=&Submit=Submit",
    # Porcentajes
    "pct_decimal_a_pct": "https://www.mamutmatematicas.com/ejercicios/tabla-porciento-decimal.php?op=3&morethan1=0&col=2&row=10&decimals=0&font=Default&FontSize=12pt&pad=25&ptitle=&Submit=Submit",
    "pct_hallar_pct_facil": "https://www.mamutmatematicas.com/ejercicios/tabla-porciento.php?col=2&row=7&min=0&max=250&step=10&pmin=10&pmax=100&pstep=10&ndec=0&decimals=0&round=3&font=Arial&workspace=3&FontSize=11pt&pad=8&border=1&color=purple&ptitle=&Submit=Submit",
    "pct_hallar_pct_mediano": "https://www.mamutmatematicas.com/ejercicios/tabla-porciento.php?col=2&row=7&min=0&max=50&step=1&pmin=0&pmax=100&pstep=5&ndec=0&decimals=0&round=3&font=Arial&workspace=3&FontSize=11pt&pad=8&border=1&color=purple&ptitle=&Submit=Submit",
    "pct_que_porcentaje": "https://www.mamutmatematicas.com/ejercicios/tabla-porcentajes-enunciados.php?col=2&row=7&min=5&max=100&step=5&pmin=1&pmax=100&pstep=1&ndec=0&decimals=0&round=3&p2=1&p3=1&font=Arial&FontSize=12pt&workspace=4&pad=8&border=1&color-green&ptitle=&Submit=Submit",
    # MCD y mcm
    "mcd_dos_numeros_50": "https://www.mamutmatematicas.com/ejercicios/tabla-mcd-mcm.php?col=2&row=10&gcf=1&gcfmin=1&gcfmax=50&lcmmin=4&lcmmax=50&numbers=2&workspace=2&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "mcd_dos_numeros_100": "https://www.mamutmatematicas.com/ejercicios/tabla-mcd-mcm.php?col=2&row=10&gcf=1&gcfmin=1&gcfmax=100&lcmmin=4&lcmmax=50&numbers=2&workspace=2&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "mcm_dos_numeros_30": "https://www.mamutmatematicas.com/ejercicios/tabla-mcd-mcm.php?col=2&row=10&gcfmin=1&gcfmax=50&lcm=1&lcmmin=2&lcmmax=30&numbers=2&workspace=2&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "factorizar_100": "https://www.mamutmatematicas.com/ejercicios/tabla-factorizar.php?col=2&row=8&type1=1&min1=100&max1=1000&font=Default&FontSize=12pt&pad=15&ptitle=&Submit=Submit",
    # Suma de fracciones
    "frac_suma_heterogeneas_2a12": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=ad&col=2&row=4&dup=1&neg=1&ntype1=fraction&n1_min=1&n1_max=12&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=1&w1_max=20&w1_list=&ntype2=fraction&n2_min=1&n2_max=12&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_suma_numeros_mixtos": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=ad&col=2&row=4&dup=1&neg=1&switch=1&ntype1=mixed&n1_min=1&n1_max=24&n1_list=&d1_min=2&d1_max=25&d1_list=&w1_min=1&w1_max=20&w1_list=&ntype2=mixed&n2_min=1&n2_max=24&n2_list=&d2_min=2&d2_max=25&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    # Resta de fracciones
    "frac_resta_heterogeneas_2a12": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=su&col=2&row=4&dup=1&neg=1&ntype1=fraction&n1_min=1&n1_max=12&n1_list=&d1_min=2&d1_max=12&d1_list=&w1_min=1&w1_max=20&w1_list=&ntype2=fraction&n2_min=1&n2_max=12&n2_list=&d2_min=2&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_resta_numeros_mixtos_2a12": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=su&col=2&row=4&dup=1&neg=1&switch=1&ntype1=mixed&n1_min=1&n1_max=12&n1_list=&d1_min=2&d1_max=12&d1_list=&w1_min=1&w1_max=20&w1_list=&ntype2=mixed&n2_min=1&n2_max=12&n2_list=&d2_min=2&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    # Multiplicación de fracciones
    "frac_mul_entero_x_fraccion": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=mu&col=2&row=4&dup=1&neg=1&switch=1&ntype1=whole&n1_min=1&n1_max=24&n1_list=&d1_min=1&d1_max=25&d1_list=&w1_min=2&w1_max=12&w1_list=&ntype2=fraction&n2_min=1&n2_max=11&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_mul_frac_x_frac": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=mu&col=2&row=4&dup=1&neg=1&ntype1=fraction&n1_min=1&n1_max=12&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=1&w1_max=20&w1_list=&ntype2=fraction&n2_min=1&n2_max=12&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_mul_mixto_x_fraccion": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=mu&col=2&row=4&dup=1&neg=1&switch=1&ntype1=mixed&n1_min=1&n1_max=12&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=2&w1_max=10&w1_list=&ntype2=fraction&n2_min=1&n2_max=11&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=20&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_mul_mixto_x_mixto": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=mu&col=2&row=4&dup=1&neg=1&ntype1=mixed&n1_min=1&n1_max=11&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=2&w1_max=10&w1_list=&ntype2=mixed&n2_min=1&n2_max=11&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=10&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    # División de fracciones
    "frac_div_frac_x_frac": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=di&col=2&row=4&dup=1&neg=1&ntype1=fraction&n1_min=1&n1_max=11&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=1&w1_max=15&w1_list=&ntype2=fraction&n2_min=1&n2_max=11&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=10&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    "frac_div_mixto_x_mixto": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones.php?op=di&col=2&row=4&dup=1&neg=1&ntype1=mixed&n1_min=1&n1_max=11&n1_list=&d1_min=1&d1_max=12&d1_list=&w1_min=1&w1_max=12&w1_list=&ntype2=mixed&n2_min=1&n2_max=11&n2_list=&d2_min=1&d2_max=12&d2_list=&w2_min=1&w2_max=10&w2_list=&extraspace=7&font=Default&FontSize=12pt&pad=10&border=on&ptitle=&Submit=Submit",
    # Fracciones - equivalentes/simplificar/conversión
    "frac_simplificar_facil": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones-2.php?op=si&col=2&row=10&nmi=1&nma=60&dmi=2&dma=20&wmi=1&wma=20&font=Default&FontSize=12pt&pad=20&ptitle=&Submit=Submit",
    "frac_equivalentes_facil": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones-2.php?op=eq&col=2&row=10&nmi=1&nma=19&dmi=2&dma=20&wmi=1&wma=20&font=Default&FontSize=12pt&pad=20&ptitle=&Submit=Submit",
    "frac_mixto_a_fraccion": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones-2.php?op=mi2fr&col=2&row=10&nmi=1&nma=25&dmi=2&dma=25&wmi=1&wma=20&font=Default&FontSize=12pt&pad=20&ptitle=&Submit=Submit",
    "frac_fraccion_a_mixto": "https://www.mamutmatematicas.com/ejercicios/tabla-fracciones-2.php?op=fr2mi&col=2&row=10&nmi=1&nma=30&dmi=2&dma=12&wmi=1&wma=20&font=Default&FontSize=12pt&pad=20&ptitle=&Submit=Submit",
    # Enteros
    "enteros_suma_10": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2B&long=0&col=2&row=10&min1=-10&max1=10&step1=1&list1=&min2=-10&max2=10&step2=1&list2=&M=2&D=2&xdiv=1&exd=1&font=Default&FontSize=14pt&pad=25&ptitle=&Submit=Submit",
    "enteros_resta_10": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=-&long=0&col=2&row=10&min1=-10&max1=10&step1=1&list1=&min2=-10&max2=10&step2=1&list2=&M=2&D=2&xdiv=1&exd=1&font=Default&FontSize=14pt&pad=25&ptitle=&Submit=Submit",
    "enteros_mul_facil": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=*&long=0&col=2&row=10&min1=-10&max1=10&step1=1&list1=&min2=-10&max2=10&step2=1&list2=&M=2&D=2&xdiv=1&exd=1&font=Default&FontSize=14pt&pad=25&ptitle=&Submit=Submit",
    "enteros_div_simple": "https://www.mamutmatematicas.com/ejercicios/tabla.php?type=%2F&long=0&col=2&row=10&min1=-100&max1=100&step1=1&list1=&min2=-10&max2=10&step2=1&list2=-10%2C+-9%2C+-8%2C+-7%2C+-6%2C+-5%2C+-4%2C+-3%2C+2%2C+2%2C+3%2C+4%2C+5%2C+6%2C+7%2C+8%2C+9%2C+10&M=2&D=2&xdiv=1&exd=1&font=Default&FontSize=14pt&pad=25&ptitle=&Submit=Submit",
    # Medición - sistema métrico
    "med_mm_cm_m": "https://www.mamutmatematicas.com/ejercicios/tabla-medicion.php?col=2&row=10&level=4&mmcm=1&cmm=1&font=Default&FontSize=12pt&pad=12&ptitle=&Submit=Submit",
    "med_metrico_longitud": "https://www.mamutmatematicas.com/ejercicios/tabla-medicion.php?col=2&row=10&decimalseparator=1&thousandseparator=1&level=1&decimaldigits1=0&decimaldigits2=1&round=1&allmetriclength=1&font=Default&FontSize=12pt&pad=6&extraspace=1&ptitle=&Submit=Submit",
    "med_metrico_peso": "https://www.mamutmatematicas.com/ejercicios/tabla-medicion.php?col=2&row=10&decimalseparator=1&thousandseparator=1&level=1&decimaldigits1=0&decimaldigits2=1&round=1&allmetricweight=1&font=Default&FontSize=12pt&pad=6&extraspace=1&ptitle=&Submit=Submit",
    # Proporciones
    "proporciones_facil": "https://www.mamutmatematicas.com/ejercicios/tabla-proporciones.php?col=2&row=3&type=0&min=0&max=100&decimaldigits=0&answerdecimals=0&workspace=5&wholenumbers=0&distancemin=1&distancemax=100&weightmin=1&weightmax=50&font=Default&FontSize=14pt&pad=8&border=1&color=teal&ptitle=&Submit=Submit",
    "proporciones_verbales": "https://www.mamutmatematicas.com/ejercicios/tabla-proporciones.php?col=2&row=2&type=1&min=0&max=100&decimaldigits=0&answerdecimals=0&workspace=8&metric=1&distancemin=1&distancemax=500&weightmin=1&weightmax=50&mileage1=1&mileage2=1&speed1=1&speed2=1&kgs1=1&kgs2=1&font=Default&FontSize=12pt&pad=8&border=1&color=teal&ptitle=&Submit=Submit",
    # Círculo
    "circulo_circunferencia": "https://www.mamutmatematicas.com/ejercicios/tabla-circulo.php?col=2&row=2&space=6&metric=1&customary=1&pi=3.14&round=2&image=1&c1=1&c2=1&font=Arial&FontSize=12pt&pad=17&ptitle=&Submit=Submit",
    "circulo_area": "https://www.mamutmatematicas.com/ejercicios/tabla-circulo.php?col=2&row=2&space=6&metric=1&customary=1&pi=3.14&round=2&image=1&a1=1&a2=1&font=Arial&FontSize=12pt&pad=17&ptitle=&Submit=Submit",
}


def descargar_pdf(url: str, destino: Path) -> bool:
    """Descarga un PDF directo."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r, open(destino, "wb") as f:
            f.write(r.read())
        if destino.stat().st_size < 1000:  # archivo demasiado pequeño = error
            destino.unlink()
            return False
        return True
    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def chrome_pdf(url: str, destino: Path) -> bool:
    """Renderiza una URL como PDF usando Chrome headless."""
    try:
        result = subprocess.run(
            [
                "google-chrome",
                "--headless",
                "--disable-gpu",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                f"--print-to-pdf={destino}",
                "--print-to-pdf-no-header",
                url,
            ],
            capture_output=True,
            timeout=30,
        )
        if destino.exists() and destino.stat().st_size > 5000:
            return True
        return False
    except Exception as e:
        print(f"  ERROR chrome: {e}")
        return False


def main():
    ok = 0
    fail = 0

    # ── 1. PDFs de muestra ────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"Descargando {len(PDFS_MUESTRA)} PDFs de muestra...")
    print(f"{'='*60}")

    for url in PDFS_MUESTRA:
        nombre = url.split("/")[-1]
        destino = MUESTRA_DIR / nombre
        if destino.exists():
            print(f"  [ya existe] {nombre}")
            ok += 1
            continue
        print(f"  Descargando {nombre}...")
        if descargar_pdf(url, destino):
            size_kb = destino.stat().st_size // 1024
            print(f"  OK ({size_kb} KB)")
            ok += 1
        else:
            print(f"  FALLO")
            fail += 1

    # ── 2. Hojas de ejercicios → PDF via Chrome ───────────────────────────────
    print(f"\n{'='*60}")
    print(f"Renderizando {len(EJERCICIOS)} hojas de ejercicios a PDF...")
    print(f"{'='*60}")

    for nombre, url in EJERCICIOS.items():
        destino = EJERCICIOS_DIR / f"{nombre}.pdf"
        if destino.exists():
            print(f"  [ya existe] {nombre}.pdf")
            ok += 1
            continue
        print(f"  Renderizando {nombre}...")
        if chrome_pdf(url, destino):
            size_kb = destino.stat().st_size // 1024
            print(f"  OK ({size_kb} KB)")
            ok += 1
        else:
            print(f"  FALLO")
            fail += 1
        time.sleep(0.5)  # pequeña pausa entre requests

    print(f"\n{'='*60}")
    print(f"COMPLETADO: {ok} OK, {fail} fallidos")
    print(f"Archivos en: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
