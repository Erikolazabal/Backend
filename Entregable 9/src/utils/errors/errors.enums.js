export const ErrorsName = {
    INVALID_PRODUCT_DATA: 'Error al agregar producto/s',
    INVALID_PRODUCT_ID: 'Error en ID de producto',
    INVALID_CART_ID: 'Error en ID de carrito',
    INVALID_ID: 'Error en ID',
    INVALID_DATA: 'Error en datos',
    INVALID_ADMIN_PASSWORD: 'Error de permisos',
    INVALID_SESSION: 'Error de sesión',
    INVALID_QUANTIY: 'Error en cantidad',
    FETCH_ERROR: 'Error al obtener datos',
    SERVER_ERROR: 'Error de servidor',
    }
    
    export const ErrorsCause = {
    INVALID_PRODUCT_DATA: 'Datos de producto inválidos o incompletos',
    INVALID_PRODUCT_ID: 'ID de producto inválido o inexistente',
    INVALID_CART_ID: 'ID de carrito inválido o inexistente',
    INVALID_ID: 'ID inválido',
    INVALID_DATA: 'Datos inválidos',
    INVALID_ADMIN_PASSWORD: 'Contraseña de administrador inválida o incorrecta',
    INVALID_SESSION: 'Sesión de usuario inválida o usuario no ha iniciado sesión',
    INVALID_QUANTIY: 'Cantidad inválida',
    FETCH_ERROR: 'Error al obtener datos',
    SERVER_ERROR: 'Error de comunicación con el servidor',
    }
    
    export const ErrorsMessage = {
    INVALID_PRODUCT_DATA: 'La solicitud falló. Se requieren datos válidos y completos del producto. El producto debe tener los siguientes campos: título: String || descripción: String || precio: Number || stock: Number || categoría: String || thumbnail: String || estado: Boolean',
    INVALID_PRODUCT_ID: 'La solicitud falló. Se requiere un ID de producto válido o existente',
    INVALID_CART_ID: 'La solicitud falló. Se requiere un ID de carrito válido o existente',
    INVALID_ID: 'Uno o más ID son inválidos o no existen.',
    INVALID_DATA: 'Cualquier campo en los datos es inválido o falta',
    INVALID_ADMIN_PASSWORD: 'No autorizado. Se requiere una contraseña de administrador válida y correcta.',
    INVALID_SESSION: 'No autorizado. Se requiere una sesión de usuario válida.',
    INVALID_QUANTIY: 'La cantidad debe ser un entero positivo y válido.',
    FETCH_ERROR: 'Ocurrió un error al obtener los datos',
    SERVER_ERROR: 'Ocurrió un error al comunicarse con el servidor.',
    }