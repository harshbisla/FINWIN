import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

const Questionnaire = () => {
  const questions = [
    { id: "q1", question: "What is your Income?", answerType: "numeric" },
    { id: "q2", question: "What is your age?", answerType: "numeric" },
    { id: "q3", question: "What are your interests?", answerType: "string" },
    { id: "q4", question: "How much risk are you willing to take?", answerType: "options", options: ["Low", "Medium", "High"] },
    { id: "q5", question: "For what time you want to invest your money?", answerType: "range", min: 1, max: 50 },
    { id: "q6", question: "What are your future goals?", answerType: "string" },
  ];

  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };






  return (
    <Card p={4} w={1000}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Investment Plan Predictor
      </Text>
      <Flex direction="column">
        <Flex direction="row" flexWrap="wrap" justifyContent="space-between">
          {questions.map((question) => (
            <Box key={question.id}
            w="48%"
            p={4}
            mb={4}
            borderRadius="md"
            bg="gray.100"
            boxShadow="md">
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {question.question}
              </Text>
              {question.answerType === "numeric" && (
                <Input
                  type="number"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}
              {question.answerType === "string" && (
                <Input
                  type="text"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  border="1px solid #CBD5E0"
                  borderRadius="md"
                  p={2}
                />
              )}
              {question.answerType === "options" && (
                <VStack align="start" spacing={1}>
                  {question.options.map((option) => (
                    <Checkbox
                      key={option}
                      isChecked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                    >
                      {option}
                    </Checkbox>
                  ))}
                </VStack>
              )}
              {question.answerType === "range" && (
                <Slider
                  min={question.min}
                  max={question.max}
                  value={parseInt(answers[question.id]) || 0}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              )}
            </Box>
          ))}
        </Flex>
        <HStack spacing={4} mt={4}>
          <Button colorScheme="blue" onClick={() => console.log(answers)}>
            Submit
          </Button>
        </HStack>
      </Flex>
    </Card>
  );
};

export default Questionnaire;
