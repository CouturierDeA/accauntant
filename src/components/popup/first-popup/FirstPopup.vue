<template>
    <div class="popup__content mod--first">
        <h3 class="popup__title">{{ greetings }}</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat, purus at suscipit dignissim, velit
            odio ultricies massa, et finibus lacus ex in felis. Mauris at ligula vel augue porttitor lacinia. Aliquam
            finibus lorem at aliquet tristique. Aliquam at risus id augue elementum vestibulum. Donec sollicitudin
            tincidunt turpis, eget fringilla quam vehicula ut. Aliquam laoreet velit sed eros feugiat, id pharetra quam
            egestas. Proin non porttitor eros.

            Ut facilisis nisi eget risus faucibus sollicitudin. In hac habitasse platea dictumst. Sed magna tellus,
            posuere in tincidunt in, mollis ac turpis. Integer massa lectus, tristique facilisis dignissim ut, finibus
            vel enim. Vestibulum eget justo sed nunc volutpat pretium. Aenean tempus facilisis urna vel dapibus. Morbi
            tristique, diam eget tempor ultricies, nisl turpis commodo metus, vitae accumsan nisi tortor et orci.
            Aliquam fermentum erat nisl, a pretium urna mollis vel. Pellentesque ac rhoncus orci.

            Cras volutpat magna finibus metus pretium vehicula. In hac habitasse platea dictumst. Quisque vel purus
            varius, egestas ipsum eu, faucibus arcu. Donec eget egestas dolor, non egestas justo. Nulla ut ornare massa.
            Nam luctus ipsum sapien. Maecenas ultrices commodo pharetra. Nulla sagittis tristique turpis eget dictum.
            Nulla mauris orci, rhoncus quis feugiat vestibulum, rutrum ac augue. Maecenas feugiat elementum justo vitae
            elementum. Praesent vulputate ligula diam, et sodales turpis sagittis eget. Etiam volutpat sodales semper.
            Morbi ante sapien, sodales quis suscipit sed, congue eu ante. Integer accumsan finibus metus non
            sollicitudin.

            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent sed
            orci tristique, consectetur ante in, aliquet ex. Nulla rhoncus lectus quis nulla ultrices, at finibus velit
            ornare. Nullam non vehicula mi. Morbi lobortis ligula et sapien rhoncus ornare. Praesent ut felis
            consectetur, commodo nisi et, tempus velit. Fusce a neque semper tortor placerat lacinia sit amet a justo.
            Pellentesque sit amet nisl eu libero interdum interdum. Donec quam metus, sollicitudin sed pharetra sed,
            rhoncus vitae nisl. Sed molestie neque eget elementum varius. Donec et orci arcu. Donec eleifend metus vel
            eleifend tincidunt. Donec nulla purus, dapibus at est quis, ornare finibus odio. Nam non aliquet magna.

            Integer convallis, velit id scelerisque egestas, felis est efficitur urna, id congue arcu est consequat
            erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Suspendisse potenti. In semper interdum elit non laoreet. Vivamus faucibus tortor nec lacus posuere auctor.
            Nam sodales egestas viverra. Nullam faucibus, arcu eget posuere aliquam, metus nunc pellentesque odio, vitae
            maximus dui justo sed libero. Nullam laoreet sollicitudin felis a luctus. Vivamus faucibus elit ut
            sollicitudin gravida. Maecenas molestie nisi neque. Praesent condimentum faucibus erat, dignissim hendrerit
            tortor porta sagittis. Praesent sollicitudin ultricies lorem, ac fermentum enim cursus vitae. Aliquam
            ultrices condimentum tellus, sed ultrices diam maximus id. Pellentesque lacus lacus, ultricies et lorem nec,
            sagittis suscipit mauris.
        </p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                greetings: 'Hello from the first popup!'
            }
        },
    }
</script>

