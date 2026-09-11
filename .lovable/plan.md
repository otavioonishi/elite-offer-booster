# Melhorar a área do cliente

A tela onde o cliente assiste aos vídeos hoje é bem crua: só um título, um "Carregando…" em tela cheia e os vídeos em blocos. Vamos deixá-la rápida, bonita e óbvia — com foco no celular.

## O que muda

**Abertura da página**
- Um topo curto com a marca, o título "Seu conteúdo" e uma linha dizendo quantos vídeos estão liberados.
- Nada de tela em branco: enquanto carrega aparecem blocos cinza no formato dos vídeos (esqueleto), então a página já parece pronta.

**Quando algo dá errado**
- Mensagem clara com botão "Tentar de novo", em vez de uma frase solta no meio da tela.

**Quando ainda não há vídeo**
- Um cartão amigável: "Nenhum vídeo publicado ainda" + convite para voltar em breve, com botão de atualizar.

**Os vídeos**
- Cada vídeo num cartão com capa escura, título legível e o player ocupando a largura toda.
- No celular: um vídeo por linha, cantos arredondados, área de toque grande nos controles. No computador: dois por linha.
- Os vídeos não carregam todos de uma vez — cada um só baixa quando aparece na tela, o que deixa a abertura muito mais rápida em internet de celular.
- Botão de tela cheia funcionando bem no celular e o vídeo nunca "estoura" a tela.

**Clareza dos passos**
- Uma faixa curta no topo: "Assista quando quiser. O link é seu acesso — guarde-o."
- Contador simples ("3 vídeos liberados") para o cliente saber que está tudo lá.

## Detalhes técnicos

- `src/routes/area.tsx`: substituir o retorno único de "Carregando…" por estados de skeleton, erro com retry e lista vazia; extrair o cartão de vídeo para `src/components/VideoCard.tsx`.
- `VideoCard`: `<video preload="none" playsInline controls>` com `poster` opcional, dentro de um wrapper `aspect-video overflow-hidden`; carregamento adiado via IntersectionObserver.
- Grid responsivo `grid-cols-1 md:grid-cols-2`, containers com `min-w-0` e títulos com `truncate` para não quebrar no celular.
- Sem mudança em `src/lib/conteudo.functions.ts` nem no painel admin; as URLs assinadas continuam iguais.
- Manter tokens de cor existentes (`glass`, `gradient-text`), sem cores fixas novas.
