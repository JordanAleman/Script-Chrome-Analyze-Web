# Script para Colorear Archivos en Bash

Este script de Bash aplica colores a los nombres de los archivos según su extensión y colorea los nombres de los directorios. Ignora directorios específicos como `.git` y `node_modules` y lista el contenido de los directorios en un formato coloreado.

## Contenido del Script

```bash
#!/bin/bash

# Función para aplicar colores a los nombres de archivos según su extensión
colorize() {
    local file="$1"
    local extension="${file##*.}"

    case "$extension" in
        js)   echo -e "\033[33m$file\033[0m" ;;  # Amarillo para archivos .js
        html) echo -e "\033[31m$file\033[0m" ;;  # Rojo para archivos .html
        css)  echo -e "\033[34m$file\033[0m" ;;  # Azul para archivos .css
        *)    echo "$file" ;;                    # Sin color para otros archivos
    esac
}

# Encuentra directorios, ignora .git y node_modules, luego lista el contenido
find . -type d \( -name ".git" -o -name "node_modules" \) -prune -o -type d -print0 | while IFS= read -r -d '' dir; do
    # Cambia el color para los directorios a azul celeste claro (color #00bfff)
    echo -e "\033[38;5;81m$dir:\033[0m"

    # Lista el contenido del directorio, aplica colores a los archivos
    ls -1 "$dir" | while IFS= read -r file; do
        if [ -d "$dir/$file" ]; then
            # Aplica color azul celeste a subdirectorios dentro de ls
            echo -e "\033[38;5;81m$file\033[0m"
        else
            # Aplica color según extensión a archivos
            colorize "$file"
        fi
    done

    echo ""
done

```

<br><br><br><br>
# Instrucciones de Configuración para el Script

Sigue estos pasos para guardar, hacer ejecutable y configurar el alias para el script `listdirs.sh`.

## 1. Guardar el Script

Crea un archivo llamado `listdirs.sh` y pega el contenido del script en él.

```bash
nano ~/listdirs.sh
```

## 2. Hacer el Script Ejecutable

Cambia los permisos del archivo para hacerlo ejecutable.

```bash
chmod +x ~/listdirs.sh
```

## 3. Crear un Alias (Opcional)

Puedes crear un alias para ejecutar el script fácilmente.

```bash
alias ld='~/listdirs.sh'
```

Luego, recarga tu archivo de configuración para que el alias esté disponible.

```bash
source ~/.bashrc
```

# Descripción de Colores

El script utiliza diferentes colores para representar archivos y directorios según sus tipos y extensiones. A continuación se muestra la descripción de cada color utilizado:

- **Amarillo (`\033[33m`)**: Para archivos `.js`
- **Rojo (`\033[31m`)**: Para archivos `.html`
- **Azul (`\033[34m`)**: Para archivos `.css`
- **Azul Celeste Claro (`\033[38;5;81m`)**: Para nombres de directorios y subdirectorios
