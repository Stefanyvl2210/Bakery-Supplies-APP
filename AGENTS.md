# AGENTS.md

## Descripción del proyecto

Bakery-Supplies-APP es el frontend React/Vite de Bakery Supplies. Consume la API REST Laravel/Sanctum de `Bakery-Supplies-API` usando Bearer Token y cubre catálogo, carrito, checkout autenticado/invitado, perfil, direcciones, pedidos, métodos de pago y panel administrativo.

## Stack principal

- React 18 con Vite.
- Material UI v5 y `@mui/styles`.
- Redux Toolkit con `redux-persist`.
- React Router v6.
- Axios para HTTP.
- React Hook Form + Yup en formularios existentes.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

No hay script de lint/test dedicado en `package.json`. Para cambios no triviales, ejecutar al menos `npm run build`.

## Variables de entorno

Usar `.env` local basado en `.env.example`:

```env
VITE_BACKEND_URL=https://dev.bakery-supplies-api.lc
VITE_API_URL=https://dev.bakery-supplies-api.lc/api
```

Para desarrollo local con Laragon:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000/api
```

## Integración API

- Cliente Axios: `src/config/axios.js`.
- Helpers API: `src/helpers/api/`.
- La API publicada usa `Authorization: Bearer <token>`.
- No usar `/sanctum/csrf-cookie` ni `/auth/me`; el usuario actual viene de `GET /user`.
- Las respuestas Laravel Resource pueden venir como `{ data: ... }` o paginadas con `{ data, links, meta }`; usar `src/helpers/api/response.js`.
- No enviar campos calculados/prohibidos al crear pedidos: `status`, `subtotal`, `taxes`, `total`, `is_guest`, `estimate_delivery`, `delivery_time`.
- En pedidos usar `delivery_type` con `delivery` o `pickup`.
- En transferencias enviar `reference`; `proof` debe ser imagen `jpg/jpeg/png/webp` y máximo backend 2 MB.

## Auth y seguridad

- El token se guarda en storage del navegador porque la API publicada solo documenta Bearer Token. No guardar secretos distintos a ese token.
- `logout` debe llamar `POST /logout`, limpiar storage y limpiar Redux.
- Roles: el backend actual expone `role` singular (`customer`/`admin`). Mantener compatibilidad defensiva con `roles` si se toca auth.
- No registrar passwords, tokens, comprobantes o payloads sensibles en consola.
- Validar inputs de archivo en frontend, pero considerar al backend como fuente de verdad.

## Convenciones de código

- Mantener componentes funcionales y estilos con `makeStyles`, siguiendo el patrón existente.
- Mantener textos de UI en inglés salvo documentación.
- No agregar dependencias sin justificarlo.
- Preferir helpers pequeños por dominio en `src/helpers/api/` antes que llamadas Axios directas dentro de componentes.
- Usar `getErrorMessage`, `getResourceData` y `getResourceCollection` para evitar duplicar parsing de errores/respuestas.
- Mantener el carrito como estado frontend; pedidos, direcciones, pagos, productos y categorías deben venir del backend.

## Estructura relevante

- `src/pages/`: vistas públicas, cuenta y admin.
- `src/pages/Admin/`: panel administrativo.
- `src/components/`: UI compartida.
- `src/features/auth/`: sesión y usuario.
- `src/features/counter/`: carrito.
- `src/helpers/api/`: clientes por recurso backend.
- `src/routing/`: rutas y guards.

## Checklist antes de entregar cambios

1. Revisar archivos relacionados antes de editar.
2. Verificar que no quede dummy data nueva.
3. Ejecutar `npm run build` si el cambio toca rutas/componentes/API.
4. Revisar auth/roles y manejo de 401/403.
5. Revisar que endpoints admin estén detrás de `RequireAdmin`.
6. Mantener `.env` real fuera de commits; solo actualizar `.env.example` si cambia la configuración documentada.
