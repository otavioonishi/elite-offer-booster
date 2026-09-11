# Corrigir completamente a área administrativa

## Objetivo
Deixar o painel simples e confiável para entrar, escolher um vídeo, enviar, publicar e excluir conteúdo.

## Alterações
- Simplificar os estados do painel e mostrar claramente cada etapa do envio.
- Validar tipo e tamanho do arquivo antes do upload.
- Corrigir tratamento de sessão expirada e erros de acesso em todas as ações.
- Impedir cliques duplicados e mostrar progresso durante envio e publicação.
- Melhorar a listagem com estado vazio, atualização e confirmação antes de excluir.
- Tornar o salvamento e a exclusão seguros, com limpeza do arquivo se a publicação falhar.
- Verificar o fluxo completo no navegador: login, upload, publicação, exibição ao cliente e exclusão.

## Detalhes técnicos
- Manter o armazenamento privado e as URLs temporárias existentes.
- Manter somente a senha do administrador; a área do cliente continua pública.
- Usar os componentes visuais já existentes e manter a tela simples.
