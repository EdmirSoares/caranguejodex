# Specs das features

Oito features, na ordem da jornada do participante. Cada critério de aceite corresponde a uma tela ou a um estado do protótipo em [`prototipo/`](../../prototipo).

| # | Feature | Tela do protótipo |
| --- | --- | --- |
| F1 | Onboarding com o mascote | `Main.dc.html` |
| F2 | Mapa do evento | `Home.dc.html` |
| F3 | Trilha de missões | `Missao.dc.html` |
| F4 | Captura da conexão (QR e scan mútuo) | `Conexao.dc.html` |
| F5 | Captura do caranguejo e consentimento | `Consentimento.dc.html` |
| F6 | Caranguejodex e nível | `Perfil.dc.html` |
| F7 | Certificado | `Certificado.dc.html` |
| F8 | Criar missão (patrocinador, mock) | `Patrocinador.dc.html` |

## F1 — Onboarding com o mascote

**História:** como participante, quero entender o jogo e escolher meus interesses para ganhar minhas primeiras tags.

**Aceite:**
- [ ] O Crabuntu se apresenta num balão de fala e explica que há um caranguejo em cada estande.
- [ ] Uma barra de progresso no topo mostra a etapa do onboarding.
- [ ] Os interesses aparecem como cards que podem ser marcados e desmarcados, até 5.
- [ ] Ao continuar, os interesses escolhidos viram tags no perfil.

## F2 — Mapa do evento

**História:** como participante, quero ver onde estão os caranguejos para decidir aonde ir.

**Aceite:**
- [ ] A planta do evento mostra auditórios, área de estandes, café e salas.
- [ ] Caranguejos aparecem nos estandes com a skin do patrocinador; os capturados têm selo, os não descobertos aparecem como silhueta "???".
- [ ] O topo mostra nível, número de conexões e XP.
- [ ] Um card "Por perto" indica o caranguejo mais próximo, a distância e a recompensa, e leva à missão.
- [ ] Barra de abas com Mapa, Trilha e Dex.

## F3 — Trilha de missões

**História:** como participante, quero ver as etapas de cada patrocinador em sequência e saber qual é a próxima.

**Aceite:**
- [ ] Cada patrocinador tem uma seção com título e a skin que será capturada.
- [ ] As etapas aparecem como nós em zigue-zague: concluídos em verde, o atual destacado, a recompensa bloqueada no fim.
- [ ] O nó atual abre um card com a tarefa, o progresso (ex.: 1/3), nível, forma de validação, prêmio e o botão "COMEÇAR · +30 XP".

## F4 — Captura da conexão

**História:** como participante, quero trocar QR com outra pessoa, e a conexão só deve contar quando os dois escanearem.

**Aceite:**
- [ ] Primeiro estado: visor de câmera para escanear o QR da outra pessoa, mostrando nome e tags dela.
- [ ] Segundo estado: o QR pessoal com contador de expiração (60 s) enquanto a outra pessoa escaneia.
- [ ] Terceiro estado: rodapé de acerto com "+30 XP", as tags da pessoa e quanto falta para capturar o caranguejo do patrocinador.
- [ ] O mesmo par de pessoas não pontua duas vezes (regra de backend; fora do protótipo).

## F5 — Captura do caranguejo e consentimento

**História:** como participante, ao capturar o caranguejo de um patrocinador quero escolher o que compartilho com ele.

**Aceite:**
- [ ] Tela de celebração com o caranguejo, número na dex, nível e XP ganho.
- [ ] Opções de compartilhamento: LinkedIn, e-mail e "aceito contato sobre vagas", cada uma independente.
- [ ] "Não compartilhar nada" guarda o caranguejo na dex do mesmo jeito.
- [ ] O botão principal informa quantos itens serão compartilhados.

## F6 — Caranguejodex e nível

**História:** como participante, quero ver minha coleção e o que falta para completá-la.

**Aceite:**
- [ ] Cards numerados (#001, #002…) para cada caranguejo do evento.
- [ ] Capturados mostram a skin, o nome do patrocinador e como foi conquistado; os demais aparecem como silhueta, "???" e a dica de onde encontrar.
- [ ] O cabeçalho mostra o total capturado (ex.: 3/6) e a barra de XP do nível.
- [ ] Com 3 ou mais missões concluídas, aparece o atalho "Certificado liberado".

## F7 — Certificado

**História:** como participante, quero um certificado das minhas conquistas que eu possa compartilhar.

**Aceite:**
- [ ] Mostra nome, evento, caranguejos capturados, conexões e nível.
- [ ] Traz um código verificável e o endereço público do certificado.
- [ ] Botões "Adicionar ao LinkedIn" e "Copiar link público".

## F8 — Criar missão (patrocinador, mock)

**História:** como patrocinador, quero configurar minha skin e minhas missões dentro das regras do evento.

**Aceite:**
- [ ] Escolha da cor da skin com prévia do caranguejo.
- [ ] Escolha de um dos 5 modelos de missão, com a descrição do modelo selecionado.
- [ ] Escolha do nível; níveis que o modelo não permite ficam desabilitados.
- [ ] O saldo do orçamento de 150 pts se atualiza conforme o nível escolhido.
