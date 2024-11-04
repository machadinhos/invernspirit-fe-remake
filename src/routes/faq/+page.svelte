<script lang="ts">
  import { onMount } from 'svelte';

  interface FAQItem {
    question: string;
    answer: string;
  }

  let focusedIndex = $state(0);

  const faqData: FAQItem[] = [
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    },
    {
      question: 'TEST',
      answer: 'test test test test'
    }
  ];

  onMount(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0 && focusedIndex < faqData.length - 1) {
        focusedIndex++;
      } else if (e.deltaY < 0 && focusedIndex > 0) {
        focusedIndex--;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && focusedIndex < faqData.length - 1) {
          focusedIndex++;
        } else if (deltaY < 0 && focusedIndex > 0) {
          focusedIndex--;
        }
        touchStartY = touchEndY;
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, {
      passive: true
    });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  });

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

  const handleTocClick = (index: number) => {
    focusedIndex = index;
  };
</script>

<div class="flex h-full flex-col">
  <h1 class="py-6 text-center text-4xl font-bold">
    Frequently Asked Questions
  </h1>

  <div class="flex h-[calc(100%-theme(spacing.24))] flex-1">
    <div class="flex h-full w-1/5 flex-col bg-background">
      <div class="p-4">
        <h2 class="text-lg font-semibold">Contents</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        {#each faqData as item, index}
          <button
            id="faq-toc-{index}"
            class="w-full rounded-xl px-4 py-2 transition-all duration-300 {focusedIndex ===
            index
              ? 'bg-primary font-medium'
              : 'hover:bg-secondary-background'}"
            onclick={() => handleTocClick(index)}
          >
            {item.question}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex h-full flex-1 flex-col items-center overflow-y-auto pb-3">
      {#each faqData as item, index}
        <div
          id="faq-question-{index}"
          class="w-[90%] transform rounded-lg p-6 transition-all duration-300 {focusedIndex ===
          index
            ? 'scale-105 bg-background shadow-lg'
            : 'opacity-50'}"
        >
          <h2 class="mb-2 text-xl font-semibold">{item.question}</h2>
          <p>{item.answer}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
