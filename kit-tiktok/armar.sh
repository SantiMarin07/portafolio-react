#!/bin/bash
# uso: ./armar.sh <guion.js> <salida.html>
# Junta la escena 3D (base.html) + el motor (tt_common.js) + tu guion en una sola pagina.
set -e; cd "$(dirname "$0")"
{ cat base.html; echo '<script>'; cat tt_common.js; echo; cat "$1"; echo '</script></body></html>'; } > "$2"
echo "listo: $2"
