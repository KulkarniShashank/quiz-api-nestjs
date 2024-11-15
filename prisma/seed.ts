import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a sample quiz
    const quiz = await prisma.quiz.create({
        data: {
            title: 'General Knowledge Quiz',
            questions: {
                create: [
                    {
                        text: 'What is the capital of France?',
                        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
                        correct_option: 2,
                    },
                    {
                        text: 'Which planet is known as the Red Planet?',
                        options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
                        correct_option: 2,
                    },
                    {
                        text: 'What is the tallest mountain in the world?',
                        options: ['K2', 'Kangchenjunga', 'Everest', 'Lhotse'],
                        correct_option: 2,
                    },
                ],
            },
        },
    });

    console.log('Sample quiz created:', quiz);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
