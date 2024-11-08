<script lang="ts">
  import { content } from '$content';
  import { SlMagnifier } from 'svelte-icons-pack/sl';
  import { Icon } from 'svelte-icons-pack';

  interface FAQItem {
    question: string;
    answer: string;
  }

  const faqData: FAQItem[] = [
    {
      question: 'TEST1',
      answer: 'test test test test'
    },
    {
      question: 'TEST2',
      answer: 'test test test test'
    },
    {
      question: 'TEST3',
      answer: 'test test test test'
    },
    {
      question: 'TEST4',
      answer: 'test test test test'
    },
    {
      question: 'TEST5',
      answer: 'test test test test'
    },
    {
      question: 'TEST6',
      answer: 'test test test test'
    },
    {
      question: 'TEST7',
      answer: 'test test test test'
    },
    {
      question: 'TEST8',
      answer: 'test test test test'
    },
    {
      question: 'TEST9',
      answer: 'test test test test'
    },
    {
      question: 'TEST10',
      answer: 'test test test test'
    },
    {
      question: 'TEST11',
      answer: 'test test test test'
    },
    {
      question: 'TEST12',
      answer: 'test test test test'
    },
    {
      question: 'TEST13',
      answer: 'test test test test'
    },
    {
      question: 'TEST14',
      answer: 'test test test test'
    },
    {
      question: 'TEST15',
      answer: 'test test test test'
    },
    {
      question: 'TEST16',
      answer: 'test test test test'
    },
    {
      question: 'TEST17',
      answer: 'test test test test'
    },
    {
      question: 'TEST18',
      answer: 'test test test test'
    },
    {
      question: 'TEST19',
      answer: 'test test test test'
    },
    {
      question: 'TEST20',
      answer: 'test test test test'
    },
    {
      question: 'TEST21',
      answer: 'test test test test'
    },
    {
      question: 'TEST22',
      answer: 'test test test test'
    },
    {
      question: 'TEST23',
      answer: 'test test test test'
    },
    {
      question: 'TEST24',
      answer: 'test test test test'
    },
    {
      question: 'TEST25',
      answer: 'test test test test'
    },
    {
      question: 'TEST26',
      answer: 'test test test test'
    }
  ];

  let focusedIndex = $state(0);
  let searchString = $state('');
  let visibleItemsIndex = $derived(getVisibleItems(faqData, searchString));

  function getVisibleItems(
    faqItems: FAQItem[],
    searchString: string
  ): number[] {
    const searchLower = searchString.toLowerCase();

    return faqItems.reduce<number[]>((matches, item, index) => {
      const hasMatch =
        item.question.toLowerCase().includes(searchLower) ||
        item.answer.toLowerCase().includes(searchLower);

      if (hasMatch) {
        matches.push(index);
      }

      return matches;
    }, []);
  }

  function scrollToElement(prefix: string, index: number) {
    const element = document.getElementById(`${prefix}-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  $effect(() => {
    scrollToElement('faq-question', focusedIndex);
    scrollToElement('faq-toc', focusedIndex);
  });

  $effect(() => {
    if (!visibleItemsIndex.includes(focusedIndex)) {
      focusedIndex = visibleItemsIndex[0];
    }
  });
</script>

<div class="flex h-full flex-col">
  <h1 class="py-6 text-center text-4xl font-bold">
    {content.faq.pageTitle}
  </h1>

  <div class="flex h-[calc(100%-theme(spacing.24))] flex-1">
    <div class="flex h-full w-1/5 flex-col bg-background">
      <div class="p-4">
        <h2 class="text-lg font-semibold">{content.faq.tocTitle}</h2>
      </div>
      <div class="mb-2 flex w-full items-center">
        <div class="px-2">
          <Icon src={SlMagnifier} size="20" color="white" />
        </div>
        <input
          name="searchString"
          autocomplete="off"
          type="search"
          bind:value={searchString}
          class="w-full bg-transparent text-white focus:border-none focus:outline-none"
          placeholder={content.faq.searchPlaceholder}
        />
      </div>
      <div class="flex-1 overflow-y-auto">
        {#each faqData as item, index}
          <button
            id="faq-toc-{index}"
            class:hidden={!visibleItemsIndex.includes(index)}
            class="w-full rounded-xl px-4 py-2 transition-all duration-300 {focusedIndex ===
            index
              ? 'bg-primary font-medium'
              : 'hover:bg-secondary-background'}"
            onclick={() => (focusedIndex = index)}
          >
            {item.question}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex h-full flex-1 flex-col items-center overflow-y-auto pb-3">
      {#each faqData as item, index}
        <div
          class:hidden={!visibleItemsIndex.includes(index)}
          tabindex={index}
          role="button"
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              focusedIndex = index;
            }
          }}
          onclick={() => (focusedIndex = index)}
          id="faq-question-{index}"
          class="w-[90%] transform rounded-lg p-6 transition-all duration-300 {focusedIndex ===
          index
            ? 'scale-105 cursor-auto bg-background shadow-lg'
            : 'cursor-pointer opacity-50'}"
        >
          <h2 class="mb-2 text-xl font-semibold">{item.question}</h2>
          <p>{item.answer}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
