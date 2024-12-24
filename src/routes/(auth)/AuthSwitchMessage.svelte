<script lang="ts">
  interface Props {
    question: string;
    href: HTMLAnchorElement['href'];
    authPage: string;
  }

  let { question, href, authPage }: Props = $props();
</script>

<div class="mt-10">
  <p class="text-center">
    {question}
    <a class="text-primary underline" {href}>{authPage}</a>
  </p>
</div>
