package queue

import (
    "errors"
    "sync"
)

type Node struct {
    Value interface{}
    prev  *Node
    next  *Node
}

type Queue struct {
    Head *Node
    Tail *Node
    size int
    mu   sync.Mutex 
}

func NewQueue() *Queue {
    return &Queue{
        Head: nil,
        Tail: nil,
        size: 0,
    }
}

func (q *Queue) Enqueue(data interface{}) {
    q.mu.Lock()
    defer q.mu.Unlock()

    newNode := &Node{
        Value: data,
    }

    q.size++
    if q.Head == nil {
        q.Head = newNode
        q.Tail = newNode
        return
    }

    q.Tail.next = newNode
    newNode.prev = q.Tail
    q.Tail = newNode
}

func (q *Queue) Dequeue() (interface{}, error) {
    q.mu.Lock()
    defer q.mu.Unlock()

    if q.Head == nil {
        return nil, errors.New("queue is empty")
    }

    q.size--

    value := q.Head.Value
    if q.Head == q.Tail {
        q.Head = nil
        q.Tail = nil
        return value, nil
    }

    q.Head = q.Head.next
    q.Head.prev = nil
    return value, nil
}

func (q *Queue) Size() int {
    q.mu.Lock()
    defer q.mu.Unlock()
    return q.size
}

func (q *Queue) Clear() {
    q.mu.Lock()
    defer q.mu.Unlock()
    q.Head = nil
    q.Tail = nil
    q.size = 0
}
