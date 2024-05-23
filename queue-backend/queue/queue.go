package queue

import (
  "fmt"
  "errors"
)

type Node struct {
  Value  interface{}
  prev *Node
  next *Node
}

type Queue struct {
  Head *Node
  Tail *Node
  size   int
}

func NewQueue() *Queue {
  return &Queue {
    Head: nil,
    Tail: nil,
    size:   0,
  }
}
func (l *Queue) Enqueue(data interface{} ){
  newNode := &Node {
    Value: data,
  }

  l.size++
  if l.Head == nil {
    l.Head = newNode
    l.Tail = newNode
    return
  }
  
  l.Tail.next = newNode
  newNode.prev = l.Tail
  l.Tail = newNode
  return
}

func (l *Queue) Pop() (interface{}, error){
  if l.Head == nil {
    return nil, errors.New("Tried to pop from an empty list!")
  }

  l.size--
  value := l.Tail.Value
  if l.Head == l.Tail {
    l.Head = nil
    l.Tail = nil
    return value, nil
  }
  l.Tail = l.Tail.prev
  l.Tail.next = nil
  return value, nil
}

func (l *Queue) PushFront(data interface{}) {
  l.size++
  newNode := &Node{
    Value: data,
  }

  if l.Head == nil {
    l.Head = newNode
    l.Tail = newNode
  }

  l.Head.prev = newNode
  newNode.next = l.Head
  l.Head = newNode
}

func (l *Queue) Dequeue() (interface{}, error){
  if l.Head == nil {
    return nil, errors.New("tried to pop from an empty list!")
  }
  l.size--

  value := l.Head.Value
  if l.Head == l.Tail {
    l.Head = nil
    l.Tail = nil
    return value, nil
  }

  l.Head = l.Head.next
  l.Head.prev = nil
  return value, nil
}

func (l *Queue) Clear() {
  for ; l.Head != nil; {
    _, err := l.Dequeue()
    if err != nil {
      fmt.Println("Error occured while clearing list")
      break
    }
  }
}